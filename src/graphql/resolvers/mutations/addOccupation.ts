import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { ClientOntologyConceptProps } from '../../types'

export const GET_OCCUPATIONS_CLIENT = gql`
  query getOccupations {
    occupations @client {
      name
      id
      type
    }
  }
`

export const addOccupationClient = (
  _: any,
  { occupation }: { occupation: ClientOntologyConceptProps },
  { cache }: { cache: InMemoryCache }
): any => {
  console.log(occupation)

  const { occupations }: any = cache.readQuery({
    query: GET_OCCUPATIONS_CLIENT,
  })

  const withoutDuplicates = (
    occ: ClientOntologyConceptProps[]
  ): ClientOntologyConceptProps[] =>
    occ.filter((o: ClientOntologyConceptProps) => o.id !== occupation.id)

  const updatedOccupations = [
    ...withoutDuplicates(occupations),
    { ...occupation, __typename: 'Occupation' },
  ]

  cache.writeQuery({
    query: GET_OCCUPATIONS_CLIENT,
    data: {
      occupations: updatedOccupations,
    },
  })

  storageHelper.set({
    type: 'occupations',
    data: updatedOccupations,
  })

  return { ...occupation, __typename: 'Occupation' }
}
