import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { split, ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { getCookie, removeCookie, redirect } from 'utils/helpers'
import {
  Education,
  Experience,
  Language,
  Occupation,
  Skill,
  Profile,
} from 'generated/myskills'

import resolvers from './resolvers'
import { storageHelper } from 'utils/helpers'

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

export const deconstructJWT = (token: string) => {
  const segments = token.split('.')

  if ((!segments as any) instanceof Array || segments.length !== 3) {
    throw new Error('Invalid JWT')
  }

  return JSON.parse(decodeURIComponent(escape(window.atob(segments[1]))))
}

const authLink = setContext((_root, { headers }) => {
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

export const dataIdFromObject = (r: any) => {
  if (r.path && r.__typename) {
    return `${r.__typename}:${r.path}`
  }

  if (r.id && r.__typename) {
    return `${r.__typename}:${r.id}`
  }

  return null
}

export const cache = new InMemoryCache({
  dataIdFromObject,
})

const terminatingLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,

  authLink.concat(httpLink)
)

export interface IClientProfileProps extends Profile {
  __typename: string
}

export type LocalStateProps = {
  occupation: Occupation
  language: Language[]
  skills: Skill[]
  educations: Education[]
  experiences: Experience[]
  traits: string[]
  whoAmI: string
  image: string
  profile: IClientProfileProps
}

const initialState: LocalStateProps = {
  occupation: null,
  language: [],
  educations: [],
  experiences: [],
  skills: [],
  traits: [],
  whoAmI: '',
  image: '',
  profile: {
    name: '',
    email: '',
    telephone: '',
    __typename: 'Profile',
  },
}

const apolloClient = new ApolloClient({
  link: ApolloLink.from([onError(handleErrors), terminatingLink]),
  cache,
  resolvers,
})

cache.writeData({
  data: {
    ...storageHelper.load(initialState),
  },
})

export default apolloClient
