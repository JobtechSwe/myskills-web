import React, { useState, useEffect, useReducer } from 'react'
import Loader from '../../components/Loader'
import gql from 'graphql-tag'
import { withApollo, WithApolloClient } from 'react-apollo'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import SkillsList from '../../components/SkillsList'
import {
  OntologyType,
  OntologyConceptResponse,
  OntologyRelationResponse,
} from '../../generated/myskills.d'

export const GET_SKILLS_AND_OCCUPATIONS_CLIENT = gql`
  query getSkillsAndOccupationsClient {
    skills @client {
      name
    }

    occupations @client {
      name
      id
      type
    }
  }
`
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

interface MatchState {
  error: string
  skills?: ClientSkillProps[]
  loading: boolean
}

type MatchAction = {
  type: 'ERROR' | 'DATA' | 'LOADING'
  payload: string | boolean | ClientSkillProps[]
}

const reducer = (state: any, action: MatchAction) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'DATA':
      return {
        ...state,
        skills: action.payload,
      }

    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

const initialState = {
  skills: [],
  error: '',
  loading: false,
}

const MatchSkills: React.FC<WithApolloClient<RouteComponentProps>> = ({
  client,
}) => {
  const {
    data: { occupations = [], skills: savedSkills = [] },
  }: any = useQuery(GET_SKILLS_AND_OCCUPATIONS_CLIENT)
  const addSkillMutation = useMutation(ADD_SKILL_CLIENT)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleAddSkill = (skill: ClientSkillProps) => {
    addSkillMutation({
      variables: {
        skill,
      },
    })

    handleToggleActive(skill)
  }

  const handleToggleActive = (skill: OntologyRelationResponse) => {
    const activeSkills = state.skills.map((stateSkill: ClientSkillProps) =>
      stateSkill.id === skill.id
        ? { ...stateSkill, isActive: !stateSkill.isActive }
        : stateSkill
    )

    dispatch({ type: 'DATA', payload: activeSkills })

    getRelatedSkills([skill], activeSkills)
  }

  const getRelatedSkills = async (
    skills: SkillsPropsUnion[],
    relSkills: OntologyRelationResponse[]
  ) => {
    dispatch({ type: 'LOADING', payload: true })
    const { data } = await client.query({
      query: GET_RELATED_SKILLS,
      variables: {
        concepts: getName(skills),
        limit: 5,
        type: OntologyType.Skill,
      },
    })

    if (data.error) {
      return dispatch({ type: 'ERROR', payload: data.error.message })
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
    dispatch({ type: 'DATA', payload: skills })
    dispatch({ type: 'LOADING', payload: false })
  }

  useEffect(() => {
    getRelatedSkills(occupations, state.skills)
  }, [occupations])

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        Valda kompetenser:
        {savedSkills.map((skill: ClientSkillProps, i: number) => (
          <div key={i}>{skill.name}</div>
        ))}
      </div>

      {state.error && <div>Error... {state.error}</div>}
      {state.skills.length > 0 && (
        <SkillsList handleAddSkill={handleAddSkill} skills={state.skills} />
      )}
      {state.loading && <Loader />}
    </>
  )
}

export default withApollo(MatchSkills)
