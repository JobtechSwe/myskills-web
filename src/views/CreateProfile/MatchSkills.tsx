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
// export interface OntologyRelationResponse extends OntologyRelationResponse {
//   isActive: boolean
// }

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
  skills: OntologyRelationResponse[]
  loading: boolean
}

type MatchAction =
  | { type: 'ERROR'; payload: string }
  | { type: 'LOADING'; payload: boolean }
  | { type: 'DATA'; payload: OntologyRelationResponse[] }

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
  const [lastSelected, setLastSelected] = React.useState(null)

  const handleAddSkill = (skill: any) => {
    addSkillMutation({
      variables: {
        skill,
      },
    })

    handleToggleActive(skill)
  }

  const handleToggleActive = (skill: any) => {
    setLastSelected(skill)

    getRelatedSkills([skill], state.skills)
  }

  const getRelatedSkills = async (
    skills: OntologyRelationResponse[],
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

    // const withoutDuplicates: OntologyRelationResponse[] = [
    //   ...new Set([...relSkills, ...data.ontologyRelated.relations]),
    // ]

    const withoutDuplicates: OntologyRelationResponse[] = [
      ...relSkills,
      ...data.ontologyRelated.relations,
    ].reduce(
      (prev, skill) =>
        prev.some(({ id }: OntologyRelationResponse) => id === skill.id)
          ? prev
          : [...prev, skill],
      []
    )
    console.log('withoutdups: ', withoutDuplicates)
    dispatch({ type: 'DATA', payload: withoutDuplicates })
    dispatch({ type: 'LOADING', payload: false })
  }

  useEffect(() => {
    getRelatedSkills(occupations, state.skills)
  }, [occupations, lastSelected])
  console.log('savedSkills: ', savedSkills)
  return (
    <>
      {state.error && <div>Error... {state.error}</div>}

      {state.skills.length > 0 && (
        <TagList
          activeItems={savedSkills}
          items={state.skills}
          onSelect={handleAddSkill}
        />
      )}
      {state.loading && <Loader />}
    </>
  )
}

export default withApollo(MatchSkills)
