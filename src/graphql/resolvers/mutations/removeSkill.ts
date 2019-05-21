import { InMemoryCache } from 'apollo-cache-inmemory'
import { SkillInput } from 'generated/myskills'
import { storageHelper } from 'utils/helpers'
import { GET_SKILLS_CLIENT } from 'graphql/shared/Queries'

export const removeSkillClient = (
  _: any,
  { skill }: { skill: SkillInput },
  { cache }: { cache: InMemoryCache }
): SkillInput => {
  const { skills = [] } = cache.readQuery<{
    skills: SkillInput[]
  }>({
    query: GET_SKILLS_CLIENT,
  })!

  const updatedSkills = skills.filter(s => s.term !== skill.term)

  cache.writeQuery({
    query: GET_SKILLS_CLIENT,
    data: { skills: updatedSkills },
  })

  storageHelper.set({
    type: 'skills',
    data: updatedSkills,
  })

  return skill
}
