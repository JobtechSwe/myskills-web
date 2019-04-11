import { InMemoryCache } from 'apollo-cache-inmemory'
import { ExperienceInput } from '../../generated/myskills'
import { GET_EXPERIENCES_CLIENT } from './addExperience'

export const removeExperience = (
  _: any,
  id: string,
  { cache }: { cache: InMemoryCache }
): ExperienceInput => {
  const { experiences }: any = cache.readQuery({
    query: GET_EXPERIENCES_CLIENT,
  })

  const updatedExperienceList = experiences.filter(
    (experience: ExperienceInput) => experience.taxonomyId !== id
  )

  cache.writeQuery({
    query: GET_EXPERIENCES_CLIENT,
    data: { experiences: updatedExperienceList },
  })

  return updatedExperienceList
}
