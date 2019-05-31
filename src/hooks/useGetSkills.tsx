import React from 'react'
import { OntologyRelationResponse, Skill, SkillInput } from 'generated/myskills'
import { useApolloClient } from 'react-apollo-hooks'
import { GET_RELATED_SKILLS } from 'graphql/shared/Queries'

const ontologyRelationToSkill = (
  ontologyItem: OntologyRelationResponse
): Skill => ({
  sourceId: ontologyItem.id,
  term: ontologyItem.term,
  type: ontologyItem.type,
  id: ontologyItem.id,
})

export const useGetSkills = (): [
  Skill[],
  (terms: { term: string }[]) => void,
  boolean
] => {
  const [data, setData] = React.useState<Skill[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const { query } = useApolloClient()

  const getData = React.useCallback(
    async (terms: { term: string }[]) => {
      setLoading(true)
      const {
        data: { ontologyRelated },
      } = await query({
        query: GET_RELATED_SKILLS,
        variables: {
          concepts: terms.map(({ term }) => term),
          limit: 5,
          type: 'SKILL',
        },
      })

      setData([
        ...data,
        ...ontologyRelated.relations
          .map(ontologyRelationToSkill)
          .filter((rel: Skill) => !data.some(d => d.id === rel.id)),
      ])
      setLoading(false)
    },
    [query, data]
  )
  return [data, getData, loading]
}
