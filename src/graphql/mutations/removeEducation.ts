import { InMemoryCache } from 'apollo-cache-inmemory'
import { EducationInput } from '../../generated/myskills'
import { GET_EDUCATIONS_CLIENT } from './addEducation'

export const removeEducation = (
  _: any,
  id: string,
  { cache }: { cache: InMemoryCache }
): EducationInput => {
  const { educations }: any = cache.readQuery({
    query: GET_EDUCATIONS_CLIENT,
  })

  const updatedEducationList = educations.filter(
    (education: EducationInput) => education.taxonomyId !== id
  )

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducationList },
  })

  return updatedEducationList
}
