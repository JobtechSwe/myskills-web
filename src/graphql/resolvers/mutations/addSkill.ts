import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'
import { OntologyRelationResponse } from '../../../generated/myskills'
import { storageHelper } from '../../../utils/helpers'

export const GET_SKILLS_CLIENT = gql`
  query getSkills {
    skills @client {
      name
    }
  }
`

export const addSkillClient = (
  _: any,
  { skill }: { skill: OntologyRelationResponse },
  { cache }: { cache: InMemoryCache }
): any => {
  const { skills }: any = cache.readQuery({
    query: GET_SKILLS_CLIENT,
  })

  const withoutDuplicates = (skills: OntologyRelationResponse[]) =>
    skills.filter(s => s.name !== skill.name)

  const updatedSkills = [...withoutDuplicates(skills), skill]

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
