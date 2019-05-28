import React from 'react'
import { OntologyRelationResponse, Skill } from 'generated/myskills'
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

export const useGetSkills = (): any => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { query } = useApolloClient()

  const getData = React.useCallback(
    async (terms: any) => {
      setLoading(true)
      const {
        data: { ontologyRelated },
      } = await query({
        query: GET_RELATED_SKILLS,
        variables: {
          concepts: terms.map(({ term }: any) => term),
          limit: 5,
          type: 'SKILL',
        },
      })

      setData([
        ...data,
        ...ontologyRelated.relations
          .map(ontologyRelationToSkill)
          .filter((rel: any) => !data.some(d => d.id === rel.id)),
      ])
      setLoading(false)
    },
    [query, data]
  )
  return [data, getData, loading]
}
