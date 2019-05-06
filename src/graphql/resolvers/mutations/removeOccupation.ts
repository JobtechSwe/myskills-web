import { InMemoryCache } from 'apollo-cache-inmemory'
import { GET_OCCUPATION_CLIENT } from './createOccupation'

export const removeOccupation = (
  _: any,
  args: any,
  { cache }: { cache: InMemoryCache }
): boolean => {
  cache.writeQuery({
    query: GET_OCCUPATION_CLIENT,
    data: null,
  })

  return true
}
