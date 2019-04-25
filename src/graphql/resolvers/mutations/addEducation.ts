import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { Education } from '../../../generated/myskills'

export const GET_EDUCATIONS_CLIENT = gql`
  query getEducations {
    educations @client {
      programme
      school
      start
      end
    }
  }
`
interface ClientEducation extends Education {
  __typename: string
}

export const addEducationClient = (
  _: any,
  { education }: { education: Education },
  { cache }: { cache: InMemoryCache }
): ClientEducation => {
  const { educations = [] } = cache.readQuery<{ educations: Education[] }>({
    query: GET_EDUCATIONS_CLIENT,
  })!
  const updatedEducations = [
    ...educations,
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

  return { ...education, __typename: 'Education' }
}
