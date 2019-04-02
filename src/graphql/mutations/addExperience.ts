import { GET_EXPERIENCES_CLIENT } from '../../views/CreateProfile/AddExperience'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience } from '../../types'

export const addExperience = (
  _: any,
  { experience }: { experience: Experience },
  { cache }: { cache: InMemoryCache }
): Experience => {
  const { experiences }: any = cache.readQuery({
    query: GET_EXPERIENCES_CLIENT,
  })

  const withoutDuplicates = (exp: Experience[]): Experience[] =>
    exp.filter((e: Experience) => e.taxonomyId !== experience.taxonomyId)

  const updatedExperiences = [...withoutDuplicates(experiences), experience]

  cache.writeQuery({
    query: GET_EXPERIENCES_CLIENT,
    data: { experiences: updatedExperiences },
  })

  return experience
}