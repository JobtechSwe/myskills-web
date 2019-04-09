import { InMemoryCache } from 'apollo-cache-inmemory'
import { getCookie } from '../../../utils/helpers'

export const isLoggedIn = (
  _: any,
  _variables: {},
  _cache: InMemoryCache
): Boolean => Boolean(getCookie('token'))
