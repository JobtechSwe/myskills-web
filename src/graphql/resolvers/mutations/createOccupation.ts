import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'

export const GET_OCCUPATION_CLIENT = gql`
  query occupation {
    occupation @client {
      term
      experience {
        years
      }
    }
  }
`

export const createOccupationClient = (
  _: any,
  { occupation }: any,
  { cache }: { cache: InMemoryCache }
): any => {
  cache.writeQuery({
    query: GET_OCCUPATION_CLIENT,
    data: {
      occupation,
    },
  })

  storageHelper.set({
    type: 'occupation',
    data: occupation,
  })

  return occupation
}
