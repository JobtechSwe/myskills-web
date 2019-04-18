import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'

export const GET_SKILLS_CLIENT = gql`
  query getSkills {
    skills @client {
      term
      taxonomyId
      type
    }
  }
`

export const addSkill = (
  _: any,
  { skill }: { skill: string },
  { cache }: { cache: InMemoryCache }
): string => {
  const { skills }: any = cache.readQuery({
    query: GET_SKILLS_CLIENT,
  })

  const withoutDuplicates = (skills: string[]) =>
    skills.filter((s: string) => s !== skill)

  const updatedSkills = [...withoutDuplicates(skills), skill]

  cache.writeQuery({
    query: GET_SKILLS_CLIENT,
    data: { skills: updatedSkills },
  })

  return skill
}
