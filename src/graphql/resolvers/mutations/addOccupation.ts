import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { ClientOntologyConceptProps } from '../../types'
import { OntologyConceptResponse } from '../../../generated/myskills'

export const GET_OCCUPATIONS_CLIENT = gql`
  query occupations {
    occupations @client {
      name
      id
      type
    }
  }
`

export const addOccupationClient = (
  _: any,
  { occupation }: { occupation: OntologyConceptResponse },
  { cache }: { cache: InMemoryCache }
): any => {
  const { occupations }: any = cache.readQuery({
    query: GET_OCCUPATIONS_CLIENT,
  })

  const withoutDuplicates = (
    occ: OntologyConceptResponse[]
  ): OntologyConceptResponse[] =>
    occ.filter((o: OntologyConceptResponse) => o.id !== occupation.id)

  const updatedOccupations = [...withoutDuplicates(occupations), occupation]

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

  return occupation
}
