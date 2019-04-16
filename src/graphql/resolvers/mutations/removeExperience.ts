import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience } from '../../../generated/myskills'
import { GET_OCCUPATIONS_CLIENT } from './addOccupation'

export const removeExperience = (
  _: any,
  id: string,
  { cache }: { cache: InMemoryCache }
): Experience => {
  const { experiences }: any = cache.readQuery({
    query: GET_OCCUPATIONS_CLIENT,
  })

  const updatedExperienceList = experiences.filter(
    (experience: Experience) => experience.taxonomyId !== id
  )

  cache.writeQuery({
    query: GET_OCCUPATIONS_CLIENT,
    data: { experiences: updatedExperienceList },
  })

  return updatedExperienceList
}
