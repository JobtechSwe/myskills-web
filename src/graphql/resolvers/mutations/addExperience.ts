import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { Experience } from '../../../generated/myskills'

export const GET_EXPERIENCES_CLIENT = gql`
  query getExperiences {
    experiences @client {
      employer
      term
      start
      end
    }
  }
`
interface ClientExperience extends Experience {
  __typename: string
}

export const addExperienceClient = (
  _: any,
  { experience }: { experience: Experience },
  { cache }: { cache: InMemoryCache }
): ClientExperience => {
  const { experiences = [] } = cache.readQuery<{ experiences: Experience[] }>({
    query: GET_EXPERIENCES_CLIENT,
  })!
  const updatedExperiences = [
    ...experiences,
    { ...experience, __typename: 'Experience' },
  ]

  cache.writeQuery({
    query: GET_EXPERIENCES_CLIENT,
    data: { experiences: updatedExperiences },
  })

  storageHelper.set({
    type: 'experiences',
    data: updatedExperiences,
  })

  return { ...experience, __typename: 'Experience' }
}
