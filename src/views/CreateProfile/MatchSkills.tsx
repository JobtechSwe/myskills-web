import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import gql from 'graphql-tag'
import { withApollo, WithApolloClient } from 'react-apollo'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import { GET_OCCUPATIONS_CLIENT } from '../../graphql/resolvers/mutations/addOccupation'
import { GET_SKILLS_CLIENT } from '../../graphql/resolvers/mutations/addSkill'
import SkillsList from '../../components/SkillsList'
import {
  OntologyType,
  OntologyConceptResponse,
  OntologyRelationResponse,
} from '../../generated/myskills.d'

export interface ClientSkillProps extends OntologyRelationResponse {
  isActive: boolean
}
export type SkillsPropsUnion = OntologyConceptResponse | ClientSkillProps

export const GET_RELATED_SKILLS = gql`
  query ontologyRelated(
    $concepts: [String!]
    $limit: Int
    $type: OntologyType!
  ) {
    ontologyRelated(
      params: { concepts: $concepts, type: $type, limit: $limit }
    ) {
      relations {
        name
        id
        score
        type
      }
    }
  }
`

export const ADD_SKILL_CLIENT = gql`
  mutation addSkillClient($skill: String!) {
    addSkillClient(skill: $skill) @client {
      name
    }
  }
`

const getName = (data: SkillsPropsUnion[]) => data.map(({ name }) => name)

const MatchSkills: React.FC<WithApolloClient<RouteComponentProps>> = ({
  client,
}) => {
  const {
    data: { occupations = [] },
  }: any = useQuery(GET_OCCUPATIONS_CLIENT)
  const {
    data: { skills: savedSkills = [] },
  }: any = useQuery(GET_SKILLS_CLIENT)
  const addSkillMutation = useMutation(ADD_SKILL_CLIENT)
  const [relatedSkills, setRelatedSkills] = useState<ClientSkillProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleAddSkill = (skill: ClientSkillProps) => {
    addSkillMutation({
      variables: {
        skill,
      },
    })

    handleToggleActive(skill)
  }

  const handleToggleActive = (skill: OntologyRelationResponse) => {
    const toggled = relatedSkills.map(s =>
      s.id === skill.id ? { ...s, isActive: !s.isActive } : s
    )

    setRelatedSkills(toggled)
    getRelatedSkills([skill], toggled)
  }

  const getRelatedSkills = async (
    skills: SkillsPropsUnion[],
    relSkills: any
  ) => {
    setLoading(true)
    const { data } = await client.query({
      query: GET_RELATED_SKILLS,
      variables: {
        concepts: getName(skills),
        limit: 5,
        type: OntologyType.Skill,
      },
    })

    if (data.error) {
      setError(data.error.message)
      return
    }

    const withIsActive = data.ontologyRelated.relations.map((x: any) => ({
      ...x,
      isActive: false,
    }))

    const withoutDuplicates = [...relSkills, ...withIsActive].reduce(
      (prev, skill) =>
        prev.some(({ id }: OntologyRelationResponse) => id === skill.id)
          ? prev
          : [...prev, skill],
      []
    )

    updateSkills(withoutDuplicates)
  }

  const updateSkills = (skills: any) => {
    setRelatedSkills(skills)
    setLoading(false)
  }

  useEffect(() => {
    getRelatedSkills(occupations, relatedSkills)
  }, [occupations])

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        Valda kompetenser:
        {savedSkills.map((s: any, i: number) => (
          <div key={i}>{s.name}</div>
        ))}
      </div>
      {error && <div>Error... {error}</div>}
      {relatedSkills.length > 0 && (
        <SkillsList handleAddSkill={handleAddSkill} skills={relatedSkills} />
      )}
      {loading && <Loader />}
    </>
  )
}

export default withApollo(MatchSkills)
