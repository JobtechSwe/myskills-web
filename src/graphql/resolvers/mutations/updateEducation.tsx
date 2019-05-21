import { InMemoryCache } from 'apollo-cache-inmemory'
import { Education } from '../../../generated/myskills'
import { GET_EDUCATIONS_CLIENT } from './addEducation'
import { storageHelper } from '../../../utils/helpers'

export const updateEducationClient = (
  _: any,
  { education }: { education: Education },
  { cache }: { cache: InMemoryCache }
): Education => {
  const { educations }: any = cache.readQuery({
    query: GET_EDUCATIONS_CLIENT,
  })

  const updatedEducationsList = educations.map((e: Education) => {
    if (e.id === education.id) {
      return { ...education, __typename: 'Education' }
    }

    return e
  })

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducationsList },
  })

  storageHelper.set({ type: 'educations', data: updatedEducationsList })

  return updatedEducationsList
}
