import { InMemoryCache } from 'apollo-cache-inmemory'
import { Education } from '../../../generated/myskills'
import { GET_EDUCATIONS_CLIENT } from './addEducation'

export const removeEducation = (
  _: any,
  programme: string,
  { cache }: { cache: InMemoryCache }
): Education => {
  const { educations }: any = cache.readQuery({
    query: GET_EDUCATIONS_CLIENT,
  })

  const updatedEducationList = educations.filter(
    (education: Education) => education.programme !== programme
  )

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducationList },
  })

  return updatedEducationList
}
