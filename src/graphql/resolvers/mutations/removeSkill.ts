import { InMemoryCache } from 'apollo-cache-inmemory'
import { OntologyRelationResponse } from '../../../generated/myskills'
import { storageHelper } from '../../../utils/helpers'
import { GET_SKILLS_CLIENT } from './addSkill'

export const removeSkillClient = (
  _: any,
  { skill }: { skill: OntologyRelationResponse },
  { cache }: { cache: InMemoryCache }
): OntologyRelationResponse => {
  const { skills = [] } = cache.readQuery<{
    skills: OntologyRelationResponse[]
  }>({
    query: GET_SKILLS_CLIENT,
  })!

  const updatedSkills = skills.filter(s => s.id !== skill.id)

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
