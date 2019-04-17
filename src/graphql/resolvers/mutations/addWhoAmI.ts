import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { storageHelper } from '../../../utils/helpers'

export const GET_WHO_AM_I_CLIENT = gql`
  query getWhoAmI {
    whoAmI @client
  }
`

export const addWhoAmI = (
  _: any,
  { whoAmI }: { whoAmI: string },
  { cache }: { cache: InMemoryCache }
): string => {
  console.log('kommer jag hit?', whoAmI)
  cache.writeQuery({
    query: GET_WHO_AM_I_CLIENT,
    data: { whoAmI: whoAmI },
  })

  storageHelper.set({
    type: 'whoAmI',
    data: whoAmI,
  })

  return whoAmI
}
