import ButtonToInput from '../../components/ButtonToInput'
import Flex from '../../components/Flex'
import Loader from '../../components/Loader'
import React, { useEffect, useReducer } from 'react'
import TagList from '../../components/TagList'
import gql from 'graphql-tag'
import { H1 } from '../../components/Typography'
import { RouteComponentProps } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { v4 } from 'uuid'
import { withApollo, WithApolloClient } from 'react-apollo'
import {
  OntologyType,
  OntologyConceptResponse,
  OntologyRelationResponse,
} from '../../generated/myskills.d'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

export const GET_SKILLS_AND_OCCUPATIONS_CLIENT = gql`
  query getSkillsAndOccupationsClient {
    skills @client {
      term
      id
      type
      score
    }

    occupations @client {
      term
      id
      type
    }
  }
`

export type SkillsPropsUnion =
  | OntologyConceptResponse
  | OntologyRelationResponse

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
  relatedSkills: OntologyRelationResponse[]
  savedSkills: OntologyRelationResponse[]
  lastSavedSkill: OntologyRelationResponse[]
  loading: boolean
}

type MatchAction =
  | { type: 'ERROR'; payload: string }
  | { type: 'LOADING'; payload: boolean }
  | { type: 'RELATED_SKILLS'; payload: OntologyRelationResponse[] }
  | { type: 'SAVED_SKILLS'; payload: OntologyRelationResponse }
  | { type: 'LAST_SAVED_SKILL'; payload: OntologyRelationResponse }

const initialState = {
  relatedSkills: [],
  savedSkills: [],
  lastSavedSkill: [],
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

    case 'RELATED_SKILLS':
      return {
        ...state,
        relatedSkills: action.payload,
      }

    case 'SAVED_SKILLS':
      return {
        ...state,
        savedSkills: [...state.savedSkills, action.payload],
      }

    case 'LAST_SAVED_SKILL':
      return {
        ...state,
        lastSavedSkill: [action.payload],
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

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    savedSkills,
  })

  const handleAddSkill = (skill: OntologyRelationResponse) => {
    addSkillMutation({
      variables: {
        skill,
      },
    })

    dispatch({
      type: 'SAVED_SKILLS',
      payload: skill,
    })

    dispatch({
      type: 'LAST_SAVED_SKILL',
      payload: skill,
    })
  }

  const getRelatedSkills = async (
    skills: OntologyRelationResponse[],
    prevRelatedSkills: OntologyRelationResponse[]
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

    dispatch({
      type: 'RELATED_SKILLS',
      payload: [...prevRelatedSkills, ...data.ontologyRelated.relations],
    })

    dispatch({ type: 'LOADING', payload: false })
  }

  useEffect(() => {
    if (!state.savedSkills.length) {
      getRelatedSkills(occupations, savedSkills)
    } else {
      getRelatedSkills(
        state.lastSavedSkill.length ? state.lastSavedSkill : state.savedSkills,
        state.savedSkills
      )
    }
  }, [state.lastSavedSkill])

  const handleFreeTextSkill = (value: string) => {
    const skill = {
      term: value,
      id: v4(),
      type: OntologyType.Skill,
      score: 1.0,
      details: {
        word2Vec: undefined,
      },
      __typename: 'OntologyRelationResponse',
    }

    addSkillMutation({
      variables: {
        skill,
      },
    })

    dispatch({
      type: 'SAVED_SKILLS',
      payload: skill,
    })
  }

  return (
    <RegistrationLayout headerText="KOMPETENS" nextPath="utbildning" step={2}>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        {state.error && <div>Error... {state.error}</div>}
        <H1 mb={20}>Vilka är dina kompetenser?</H1>
        {state.relatedSkills.length > 0 && (
          <TagList
            activeItems={state.savedSkills}
            items={state.relatedSkills.filter(
              (x: OntologyRelationResponse) =>
                !state.savedSkills.some(
                  (y: OntologyRelationResponse) => y.id === x.id
                )
            )}
            onSelect={handleAddSkill}
          />
        )}

        <ButtonToInput onSelect={handleFreeTextSkill} />

        {state.loading && <Loader />}
      </Flex>
    </RegistrationLayout>
  )
}

export default withApollo(MatchSkills)
