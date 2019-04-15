import { InMemoryCache } from 'apollo-cache-inmemory'
import { ExperienceInput } from '../../../generated/myskills'
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
): ExperienceInput => {
  const { experiences }: any = cache.readQuery({
    query: GET_EXPERIENCES_CLIENT,
  })
  const withoutDuplicates = (exp: ExperienceInput[]): ExperienceInput[] =>
    exp.filter((e: ExperienceInput) => e.taxonomyId !== experience.taxonomyId)

  const updatedExperiences = [
    ...withoutDuplicates(experiences),
    experience,
  ].map((exp: ExperienceInput) => ({
    ...exp,
    __typename: 'Experience',
  }))

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

  return experience
}
