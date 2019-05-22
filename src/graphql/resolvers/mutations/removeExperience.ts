import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience } from 'generated/myskills'
import { GET_EXPERIENCES_CLIENT } from './addExperience'
import { storageHelper } from 'utils/helpers'

export const removeExperienceClient = (
  _: any,
  { experience }: { experience: Experience },
  { cache }: { cache: InMemoryCache }
): Experience => {
  const { experiences }: any = cache.readQuery({
    query: GET_EXPERIENCES_CLIENT,
  })

  const updatedExperienceList = experiences.filter(
    (e: Experience) => e.id !== experience.id
  )

  cache.writeQuery({
    query: GET_EXPERIENCES_CLIENT,
    data: { experiences: updatedExperienceList },
  })

  storageHelper.set({ type: 'experiences', data: updatedExperienceList })

  return updatedExperienceList
}
