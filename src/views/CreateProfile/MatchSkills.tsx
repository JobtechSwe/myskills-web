import React, { useEffect, useReducer } from 'react'
import Loader from '../../components/Loader'
import gql from 'graphql-tag'
import { withApollo, WithApolloClient } from 'react-apollo'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import TagList from '../../components/TagList'
import {
  OntologyType,
  OntologyConceptResponse,
  OntologyRelationResponse,
  Skill,
} from '../../generated/myskills.d'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

export const GET_SKILLS_AND_OCCUPATIONS_CLIENT = gql`
  query getSkillsAndOccupationsClient {
    skills @client {
      term
    }

    occupations @client {
      term
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
        term
        id
        score
        type
      }
    }
  }
`

export const ADD_SKILL_CLIENT = gql`
  mutation addSkillClient($skill: SkillInput!) {
    addSkillClient(skill: $skill) @client {
      term
    }
  }
`

const getName = (data: SkillsPropsUnion[]) => data.map(({ term }) => term)

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

  const handleAddSkill = (skill: OntologyRelationResponse) => {
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
    skills: OntologyRelationResponse[],
    relSkills: ClientSkillProps[]
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

    dispatch({ type: 'LOADING', payload: false })
    dispatch({ type: 'DATA', payload: withoutDuplicates })
  }

  useEffect(() => {
    getRelatedSkills(occupations, state.skills)
  }, [occupations])

  return (
    <RegistrationLayout
      headerText="KOMPETENS"
      nextPath="/skapa-cv/utbildning"
      step={2}
    >
      <>
        <div style={{ marginBottom: '2rem' }}>
          Valda kompetenser:
          {savedSkills.map((skill: Skill) => (
            <div key={skill.term}>{skill.term}</div>
          ))}
        </div>

        {state.error && <div>Error... {state.error}</div>}

        {state.skills.length > 0 && (
          <TagList handleTagClick={handleAddSkill} items={state.skills} />
        )}
        {state.loading && <Loader />}
      </>
    </RegistrationLayout>
  )
}

export default withApollo(MatchSkills)
