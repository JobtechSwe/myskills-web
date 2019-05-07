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

  const handleAddSkill = (skill: any) => {
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

    // const withoutDuplicates: OntologyRelationResponse[] = [
    //   ...prevRelatedSkills,
    //   ...data.ontologyRelated.relations,
    // ]
    //   .reduce(
    //     (prev, skill) =>
    //       prev.some(({ id }: OntologyRelationResponse) => id === skill.id)
    //         ? prev
    //         : [...prev, skill],
    //     []
    //   )
    //   .filter((x: any) =>
    //     state.savedSkills.find((y: any) => y.id === x.id) ? false : true
    //   )

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

  const tempRelated = state.relatedSkills.filter(
    (x: any) => !state.savedSkills.some((y: any) => y.id === x.id)
  )

  return (
    <>
      {state.error && <div>Error... {state.error}</div>}

      {state.relatedSkills.length > 0 && (
        <TagList
          activeItems={state.savedSkills}
          items={tempRelated}
          onSelect={handleAddSkill}
        />
      )}
      {state.loading && <Loader />}
    </>
  )
}

export default withApollo(MatchSkills)
