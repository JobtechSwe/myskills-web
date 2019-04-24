import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience, ExperienceInput } from '../../../generated/myskills'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'

export const GET_EXPERIENCES_CLIENT = gql`
  query getExperiences {
    experiences @client {
      term
      taxonomyId
      years
    }
  }
`

export const addExperienceClient = (
  _: any,
  { experience }: { experience: ExperienceInput },
  { cache }: { cache: InMemoryCache }
): any => {
  const { experiences = [] } = cache.readQuery<{
    experiences: ExperienceInput[]
  }>({
    query: GET_EXPERIENCES_CLIENT,
  })!

  const withoutDuplicates = (exp: ExperienceInput[]): ExperienceInput[] =>
    exp.filter((e: ExperienceInput) => e.taxonomyId !== experience.taxonomyId)

  const updatedExperiences = [
    ...withoutDuplicates(experiences),
    { ...experience, __typename: 'Experience' },
  ]

  cache.writeQuery({
    query: GET_EXPERIENCES_CLIENT,
    data: {
      experiences: updatedExperiences,
    },
  })

  storageHelper.set({
    type: 'experiences',
    data: updatedExperiences,
  })

  return { ...experience, __typename: 'Experience' }
}
