import { InMemoryCache } from 'apollo-cache-inmemory'
import { GET_OCCUPATION_CLIENT } from './createOccupation'
import { storageHelper } from '../../../utils/helpers'

export const removeOccupationClient = (
  _: any,
  _args: any,
  { cache }: { cache: InMemoryCache }
): any => {
  cache.writeQuery({
    query: GET_OCCUPATION_CLIENT,
    data: { occupation: null },
  })

  storageHelper.remove('occupation')

  return { occupation: null }
}
