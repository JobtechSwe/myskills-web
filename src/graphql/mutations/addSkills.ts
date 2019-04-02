import { InMemoryCache } from 'apollo-cache-inmemory'
import { Skill } from '../../types'
import gql from 'graphql-tag'

export const GET_SKILLS_CLIENT = gql`
  query getSkills {
    skills @client
  }
`
export const addSkills = (
  _: any,
  { skill }: { skill: Skill },
  { cache }: { cache: InMemoryCache }
): Skill => {
  const { skills }: any = cache.readQuery({
    query: GET_SKILLS_CLIENT,
  })

  const withoutDuplicates = (skills: Skill[]): Skill[] =>
    skills.filter((s: Skill) => s.taxonomyId !== skill.taxonomyId)

  const updatedExperiences = [...withoutDuplicates(skills), skill]

  cache.writeQuery({
    query: GET_SKILLS_CLIENT,
    data: { experiences: updatedExperiences },
  })

  return skill
}
