import { InMemoryCache } from 'apollo-cache-inmemory'
import { Education } from 'generated/myskills'
import { GET_EDUCATIONS_CLIENT } from 'graphql/shared/Queries'
import { storageHelper } from 'utils/helpers'

export const removeEducationClient = (
  _: any,
  { id }: { id: string },
  { cache }: { cache: InMemoryCache }
): boolean => {
  const { educations = [] } = cache.readQuery<{ educations: Education[] }>({
    query: GET_EDUCATIONS_CLIENT,
  })!

  try {
    const updatedEducationList = educations.filter(
      (e: Education) => e.id !== id
    )
    cache.writeQuery({
      query: GET_EDUCATIONS_CLIENT,
      data: { educations: updatedEducationList },
    })

    storageHelper.set({ type: 'educations', data: updatedEducationList })

    return true
  } catch (e) {
    return false
  }
}
