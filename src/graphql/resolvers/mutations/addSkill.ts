import { InMemoryCache } from 'apollo-cache-inmemory'
import { SkillInput, Skill } from 'generated/myskills'
import { storageHelper } from 'utils/helpers'
import { GET_SKILLS_CLIENT } from 'graphql/shared/Queries'
import { v4 } from 'uuid'
export const addSkillClient = (
  _: any,
  { skill }: { skill: Skill },
  { cache }: { cache: InMemoryCache }
): Skill => {
  const clientSkill = { ...skill, __typename: 'Skill' }
  const { skills = [] } = cache.readQuery<{
    skills: Skill[]
  }>({
    query: GET_SKILLS_CLIENT,
  })!

  const withoutDuplicates = (skills: Skill[]) =>
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
