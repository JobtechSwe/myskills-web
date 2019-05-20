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

export const GET_SKILLS_AND_OCCUPATION_CLIENT = gql`
  query getSkillsAndOccupationClient {
    skills @client {
      term
      id
      type
      score
    }

    occupation @client {
      term
      experience {
        years
      }
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

export const REMOVE_SKILL_CLIENT = gql`
  mutation removeSkillClient($skill: SkillInput!) {
    removeSkillClient(skill: $skill) @client {
      term
      id
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
  | { type: 'SAVED_SKILLS'; payload: OntologyRelationResponse[] }
  | { type: 'LAST_SAVED_SKILL'; payload: OntologyRelationResponse }

const initialState: MatchState = {
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
        savedSkills: action.payload,
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
    data: { occupation = {}, skills: savedSkills = [] },
  }: any = useQuery(GET_SKILLS_AND_OCCUPATION_CLIENT)
  const addSkillMutation = useMutation(ADD_SKILL_CLIENT)
  const removeSkillMutation = useMutation(REMOVE_SKILL_CLIENT)

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    savedSkills,
  })

  const handleSkillClick = (skill: OntologyRelationResponse) => {
    if (!state.savedSkills.some(s => s.id === skill.id)) {
      addSkillMutation({
        variables: {
          skill,
        },
      })

      dispatch({
        type: 'SAVED_SKILLS',
        payload: [...state.savedSkills, skill],
      })

      dispatch({
        type: 'LAST_SAVED_SKILL',
        payload: skill,
      })
    } else {
      removeSkillMutation({
        variables: {
          skill,
        },
      })

      dispatch({
        type: 'SAVED_SKILLS',
        payload: state.savedSkills.filter(
          (s: OntologyRelationResponse) => s.id !== skill.id
        ),
      })
    }
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
      getRelatedSkills([occupation], savedSkills)
    } else {
      getRelatedSkills(
        state.lastSavedSkill.length ? state.lastSavedSkill : state.savedSkills,
        state.savedSkills
      )
    }
  }, [state.lastSavedSkill])

  const handleFreeTextSkill = async (value: string) => {
    const skill = {
      term: value,
      id: v4(),
      type: OntologyType.Skill,
      score: 1.0,
      __typename: 'OntologyRelationResponse',
    }

    const {
      data: { addSkillClient: addedSkill },
    } = await addSkillMutation({
      variables: {
        skill,
      },
    })

    dispatch({
      type: 'SAVED_SKILLS',
      payload: [...state.savedSkills, addedSkill],
    })
  }

  return (
    <RegistrationLayout headerText="KOMPETENS" nextPath="erfarenheter" step={2}>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
      >
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
            onSelect={handleSkillClick}
          />
        )}

        <ButtonToInput
          buttonText="+ Lägg till en kompetens"
          inputPlaceholder="Lägg till en kompetens"
          onSelect={handleFreeTextSkill}
        />

        {state.loading && <Loader />}
      </Flex>
    </RegistrationLayout>
  )
}

export default withApollo(MatchSkills)
