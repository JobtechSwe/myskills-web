import { InMemoryCache } from 'apollo-cache-inmemory'
import { Education } from '../../../generated/myskills'
import { GET_EDUCATIONS_CLIENT } from './addEducation'
import { storageHelper } from '../../../utils/helpers'

export const removeEducationClient = (
  _: any,
  { education }: { education: Education },
  { cache }: { cache: InMemoryCache }
): Education => {
  const { educations }: any = cache.readQuery({
    query: GET_EDUCATIONS_CLIENT,
  })

  const updatedEducationList = educations.filter(
    (e: Education) => e.programme !== education.programme
  )

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducationList },
  })

  storageHelper.set({ type: 'educations', data: updatedEducationList })

  return updatedEducationList
}
