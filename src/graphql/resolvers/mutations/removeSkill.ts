import { InMemoryCache } from 'apollo-cache-inmemory'
import { Skill } from 'generated/myskills'
import { storageHelper } from 'utils/helpers'
import { GET_SKILLS_CLIENT } from 'graphql/shared/Queries'

export const removeSkillClient = (
  _: any,
  { id }: { id: string },
  { cache }: { cache: InMemoryCache }
): Boolean => {
  try {
    const { skills = [] } = cache.readQuery<{
      skills: Skill[]
    }>({
      query: GET_SKILLS_CLIENT,
    })!

    const updatedSkills = skills.filter(s => s.id !== id)

    cache.writeQuery({
      query: GET_SKILLS_CLIENT,
      data: { skills: updatedSkills },
    })

    storageHelper.set({
      type: 'skills',
      data: updatedSkills,
    })

    return true
  } catch (error) {
    throw new Error('Remove skill client error...')
  }
}
