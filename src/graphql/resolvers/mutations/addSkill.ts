import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { SkillInput } from '../../../generated/myskills'
import { storageHelper } from '../../../utils/helpers'

export const GET_SKILLS_CLIENT = gql`
  query getSkills {
    skills @client {
      term
      type
      sourceId
      id
    }
  }
`
export const addSkillClient = (
  _: any,
  { skill }: { skill: SkillInput },
  { cache }: { cache: InMemoryCache }
): SkillInput => {
  const clientSkill = { ...skill, __typename: 'Skill' }
  const { skills = [] } = cache.readQuery<{
    skills: SkillInput[]
  }>({
    query: GET_SKILLS_CLIENT,
  })!

  const withoutDuplicates = (skills: SkillInput[]) =>
    skills.filter(s => s.term !== skill.term)

  const updatedSkills = [...withoutDuplicates(skills), clientSkill]

  cache.writeQuery({
    query: GET_SKILLS_CLIENT,
    data: { skills: updatedSkills },
  })

  storageHelper.set({
    type: 'skills',
    data: updatedSkills,
  })

  return clientSkill
}
