import { InMemoryCache } from 'apollo-cache-inmemory'
import { getCookie } from '../../../utils/helpers'
export const isLoggedIn = (
  _: any,
  _variables: {},
  { cache }: { cache: InMemoryCache }
): Boolean => {
  const token = getCookie('token')
  return Boolean(token)
}
