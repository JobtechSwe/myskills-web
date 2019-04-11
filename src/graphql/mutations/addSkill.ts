import { InMemoryCache } from 'apollo-cache-inmemory'
import { SkillInput } from '../../generated/myskills'
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
  { skill }: { skill: SkillInput },
  { cache }: { cache: InMemoryCache }
): SkillInput => {
  const { skills }: any = cache.readQuery({
    query: GET_SKILLS_CLIENT,
  })

  const withoutDuplicates = (skills: SkillInput[]): SkillInput[] =>
    skills.filter((s: SkillInput) => s.taxonomyId !== skill.taxonomyId)

  const updatedSkills = [...withoutDuplicates(skills), skill]

  cache.writeQuery({
    query: GET_SKILLS_CLIENT,
    data: { skills: updatedSkills },
  })

  return skill
}
