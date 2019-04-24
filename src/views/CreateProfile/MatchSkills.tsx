import React, { useState, useEffect, useReducer } from 'react'
import Loader from '../../components/Loader'
import gql from 'graphql-tag'
import { withApollo, WithApolloClient } from 'react-apollo'
import { useQuery, useMutation, QueryHookResult } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import SkillsList from '../../components/SkillsList'
import {
  OntologyType,
  OntologyConceptResponse,
  OntologyRelationResponse,
} from '../../generated/myskills.d'

export const GET_SKILLS_AND_OCCUPATIONS_CLIENT = gql`
  query getSkillsAndOccupationsClient {
    ontologyRelated @client {
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
  mutation addSkillClient($skill: OntologyRelatedInput!) {
    addSkillClient(skill: $skill) @client {
      name
    }
  }
`

const getName = (data: SkillsPropsUnion[]) => data.map(({ name }) => name)

interface MatchState {
  error: string
  skills: ClientSkillProps[]
  loading: boolean
}

type MatchAction =
  | { type: 'ERROR'; payload: string }
  | { type: 'LOADING'; payload: boolean }
  | { type: 'DATA'; payload: ClientSkillProps[] }

const initialState = {
  skills: [],
  error: '',
  loading: false,
}

const reducer = (state: MatchState, action: MatchAction) => {
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

    const withIsActive = data.ontologyRelated.relations.map(
      (x: OntologyRelationResponse) => ({
        ...x,
        isActive: false,
      })
    )

    const withoutDuplicates: ClientSkillProps[] = [
      ...relSkills,
      ...withIsActive,
    ].reduce(
      (prev, skill) =>
        prev.some(({ id }: OntologyRelationResponse) => id === skill.id)
          ? prev
          : [...prev, skill],
      []
    )

    dispatch({ type: 'DATA', payload: withoutDuplicates })
    dispatch({ type: 'LOADING', payload: false })
  }

  useEffect(() => {
    getRelatedSkills(occupations, state.skills)
  }, [occupations])

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        Valda kompetenser:
        {savedSkills.map((skill: ClientSkillProps) => (
          <div key={skill.id}>{skill.name}</div>
        ))}
      </div>

      {state.error && <div>Error... {state.error}</div>}

      {state.loading && <Loader />}

      {state.skills.length > 0 && (
        <SkillsList handleAddSkill={handleAddSkill} skills={state.skills} />
      )}
    </>
  )
}

export default withApollo(MatchSkills)
