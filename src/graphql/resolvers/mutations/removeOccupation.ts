import { InMemoryCache } from 'apollo-cache-inmemory'
import { GET_OCCUPATIONS_CLIENT } from './addOccupation'
import { OntologyConceptResponse } from '../../../generated/myskills'

export const removeOccupation = (
  _: any,
  id: string,
  { cache }: { cache: InMemoryCache }
): OntologyConceptResponse[] => {
  const { occupations = [] } = cache.readQuery<{
    occupations: OntologyConceptResponse[]
  }>({
    query: GET_OCCUPATIONS_CLIENT,
  })!

  const updatedOccupationList = occupations.filter(
    (occupation: OntologyConceptResponse) => occupation.id !== id
  )

  cache.writeQuery({
    query: GET_OCCUPATIONS_CLIENT,
    data: { occupations: updatedOccupationList },
  })

  return updatedOccupationList
}
