import { InMemoryCache } from 'apollo-cache-inmemory'
import { EducationInput } from '../../../generated/myskills'
import gql from 'graphql-tag'

export const GET_EDUCATIONS_CLIENT = gql`
  query getEducations {
    educations @client {
      term
      taxonomyId
    }
  }
`

export const addEducation = (
  _: any,
  { education }: { education: EducationInput },
  { cache }: { cache: InMemoryCache }
): EducationInput => {
  const { educations }: any = cache.readQuery({
    query: GET_EDUCATIONS_CLIENT,
  })

  const withoutDuplicates = (educations: EducationInput[]): EducationInput[] =>
    educations.filter(
      (e: EducationInput) => e.taxonomyId !== education.taxonomyId
    )

  const updatedEducations = [...withoutDuplicates(educations), education]

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducations },
  })

  return education
}
