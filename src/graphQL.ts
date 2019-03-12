import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split, ApolloLink } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getCookie, removeCookie, redirect } from './utils/helpers'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
})

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_GRAPHQL_WS_URI}`,
  options: {
    reconnect: true,
  },
})

function deconstructJWT(token: string) {
  const segments = token.split('.')

  if ((!segments as any) instanceof Array || segments.length !== 3) {
    throw new Error('Invalid JWT')
  }

  return JSON.parse(decodeURIComponent(escape(window.atob(segments[1]))))
}

const authLink = setContext((root, { headers }) => {
  const token = getCookie('token')

  // Redirect to login if no token
  if (!token) {
    return { headers }
  }

  // Check if token has expired
  const tokenIssuedAt = deconstructJWT(token).iat

  if ((Date.now() - tokenIssuedAt * 1000) / 1000 / 60 / 60 / 24 > 30) {
    removeCookie('token')
    redirect('/')

    return { headers }
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const terminatingLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: ApolloLink.from([terminatingLink]),
  cache: new InMemoryCache(),
})

export default client
