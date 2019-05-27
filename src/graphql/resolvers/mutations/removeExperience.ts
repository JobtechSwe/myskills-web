import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience, GetExperiencesClientQuery } from 'generated/myskills'
import { GET_EXPERIENCES_CLIENT } from './addExperience'
import { storageHelper } from 'utils/helpers'

export const removeExperienceClient = (
  _: any,
  { id }: { id: string },
  { cache }: { cache: InMemoryCache }
): boolean => {
  const { experiences } = cache.readQuery<GetExperiencesClientQuery>({
    query: GET_EXPERIENCES_CLIENT,
  })
  try {
    const updatedExperienceList = experiences.filter(
      (e: Experience) => e.id !== id
    )

    cache.writeQuery({
      query: GET_EXPERIENCES_CLIENT,
      data: { experiences: updatedExperienceList },
    })
    storageHelper.set({ type: 'experiences', data: updatedExperienceList })
    return true
  } catch (error) {
    throw new Error(`Remove client experience error, ${error}`)
  }
}
