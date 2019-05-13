import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { Occupation, OccupationInput } from '../../../generated/myskills'

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

interface ClientOccupation extends Occupation {
  __typename: string
}

export const createOccupationClient = (
  _: any,
  { occupation }: { occupation: OccupationInput },
  { cache }: { cache: InMemoryCache }
): ClientOccupation => {
  const clientOccupation = { ...occupation, __typename: 'Occupation' }
  const occupationWithExperience = clientOccupation.experience
    ? {
        ...clientOccupation,
        experience: {
          ...clientOccupation.experience,
          __typename: 'OccupationExperience',
        },
      }
    : clientOccupation

  cache.writeQuery({
    query: GET_OCCUPATION_CLIENT,
    data: {
      occupation: occupationWithExperience,
    },
  })

  storageHelper.set({
    type: 'occupation',
    data: occupationWithExperience,
  })

  return occupationWithExperience
}
