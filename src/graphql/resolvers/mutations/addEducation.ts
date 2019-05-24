import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from 'utils/helpers'
import { Education } from 'generated/myskills'
import { GET_EDUCATIONS_CLIENT } from 'graphql/shared/Queries'
import { v4 } from 'uuid'

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

  const educationWithId = {
    ...education,
    id: v4(),
    __typename: 'Education',
  }

  const updatedEducations = [...educations, educationWithId]

  cache.writeQuery({
    query: GET_EDUCATIONS_CLIENT,
    data: { educations: updatedEducations },
  })

  storageHelper.set({
    type: 'educations',
    data: updatedEducations,
  })

  return educationWithId
}
