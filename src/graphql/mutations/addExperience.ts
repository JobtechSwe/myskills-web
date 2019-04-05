import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience } from '../../types'
import { storageHelper } from '../../utils/helpers'
import gql from 'graphql-tag'

export const GET_EXPERIENCES_CLIENT = gql`
  query getExperiences {
    experiences @client {
      name
      taxonomyId
      years
    }
  }
`

export const addExperience = (
  _: any,
  { experience }: { experience: Experience },
  { cache }: { cache: InMemoryCache }
): Experience => {
  const { experiences }: any = cache.readQuery({
    query: GET_EXPERIENCES_CLIENT,
  })

  const withoutDuplicates = (exp: Experience[]): Experience[] =>
    exp.filter((e: Experience) => e.taxonomyId !== experience.taxonomyId)

  const updatedExperiences = [...withoutDuplicates(experiences), experience]

  cache.writeQuery({
    query: GET_EXPERIENCES_CLIENT,
    data: { experiences: updatedExperiences },
  })

  storageHelper.set({
    type: 'experiences',
    data: updatedExperiences,
  })

  return experience
}
