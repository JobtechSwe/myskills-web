import { InMemoryCache } from 'apollo-cache-inmemory'
import { Education } from '../../types'
import gql from 'graphql-tag'

export const GET_EDUCATIONS_CLIENT = gql`
  query getEducations {
    educations @client
  }
`

export const addEducation = (
  _: any,
  { education }: { education: Education },
  { cache }: { cache: InMemoryCache }
): Education => {
  const { educations }: any = cache.readQuery({
    query: GET_EDUCATIONS_CLIENT,
  })

  const withoutDuplicates = (educations: Education[]): Education[] =>
    educations.filter((e: Education) => e.taxonomyId !== education.taxonomyId)

  const updatedEducations = [...withoutDuplicates(educations), education]

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducations },
  })

  return education
}
