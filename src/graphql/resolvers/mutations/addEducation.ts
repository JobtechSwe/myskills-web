import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'

export const GET_EDUCATIONS_CLIENT = gql`
  query getEducations {
    educations @client {
      education
      school
      start
      end
    }
  }
`

export const addEducationClient = (
  _: any,
  { education }: { education: any },
  { cache }: { cache: InMemoryCache }
): any => {
  const { educations = [] } = cache.readQuery<{ educations: any[] }>({
    query: GET_EDUCATIONS_CLIENT,
  })!

  const withoutDuplicates = (educations: any[]): any[] =>
    educations.filter((e: any) => e.taxonomyId !== education.taxonomyId)

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
