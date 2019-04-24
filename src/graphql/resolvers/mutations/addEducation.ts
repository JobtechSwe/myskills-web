import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import { Education, EducationInput, Query } from '../../../generated/myskills'
import gql from 'graphql-tag'

export const GET_EDUCATIONS_CLIENT = gql`
  query getEducations {
    educations @client {
      term
      taxonomyId
    }
  }
`

export const addEducationClient = (
  _: any,
  { education }: { education: EducationInput },
  { cache }: { cache: InMemoryCache }
): EducationInput => {
  const { educations = [] } = cache.readQuery<{ educations: EducationInput[] }>(
    {
      query: GET_EDUCATIONS_CLIENT,
    }
  )!

  const withoutDuplicates = (educations: EducationInput[]): EducationInput[] =>
    educations.filter(
      (e: EducationInput) => e.taxonomyId !== education.taxonomyId
    )

  const updatedEducations = [
    ...withoutDuplicates(educations),
    { ...education, __typename: 'Education' },
  ]

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducations },
  })

  storageHelper.set({
    type: 'educations',
    data: updatedEducations,
  })

  return education
}
