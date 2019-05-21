import { InMemoryCache } from 'apollo-cache-inmemory'
import { GET_OCCUPATION_CLIENT } from './createOccupation'
import { storageHelper } from 'utils/helpers'

export const removeOccupation = (
  _: any,
  args: any,
  { cache }: { cache: InMemoryCache }
): boolean => {
  cache.writeQuery({
    query: GET_OCCUPATION_CLIENT,
    data: null,
  })

  storageHelper.set({
    type: 'occupation',
    data: null,
  })

  return true
}
