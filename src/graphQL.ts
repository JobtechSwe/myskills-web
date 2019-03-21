import ApolloClient from 'apollo-client'
import { withClientState } from 'apollo-link-state'
import { WebSocketLink } from 'apollo-link-ws'
import { split, ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
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

export const handleErrors = ({ graphQLErrors, networkError }: any) => {
  const hasGraphQLError = graphQLErrors && graphQLErrors.length > 0

  if (
    hasGraphQLError &&
    graphQLErrors[0].message ===
      "Cannot read property 'permissions' of undefined" &&
    !getCookie('token')
  ) {
    redirect('/')
    return
  }

  if (networkError && networkError.statusCode === 503) {
    redirect('/unavailable')
  }
}

export function deconstructJWT(token: string) {
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

  // 30 days
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

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected: false,
          },
        }
        cache.writeData({ data })
        return null
      },
    },
  },
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
  },
})

const terminatingLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(stateLink).concat(httpLink)
)

const client = new ApolloClient({
  link: ApolloLink.from([onError(handleErrors), terminatingLink]),
  cache,
})

export default client
