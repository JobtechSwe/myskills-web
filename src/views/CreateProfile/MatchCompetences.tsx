import React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from 'react-apollo-hooks'
import { ClientExperienceProps } from '../../graphql/types'
import {
  OntologyRelatedInput,
  OntologyRelatedResponse,
  OntologyType,
} from '../../generated/myskills.d'

const GET_RELATED_SKILLS = gql`
  query ontology($concepts: [String!]) {
    ontologyRelated(params: { concepts: $concepts, type: SKILL }) {
      relations {
        name
        score
      }
    }
  }
`
const GET_EXPERIENCES_CLIENT = gql`
  query experiences {
    experiences @client {
      term
    }
  }
`

const MatchCompetences: React.FC<RouteComponentProps> = () => {
  const {
    data: { experiences },
  }: any = useQuery(GET_EXPERIENCES_CLIENT)

  const terms = experiences.map((t: ClientExperienceProps) => t.term)

  const { data, loading, error } = useQuery<
    { ontologyRelated: OntologyRelatedResponse },
    OntologyRelatedInput
  >(GET_RELATED_SKILLS, {
    variables: {
      concepts: terms,
      type: OntologyType.Skill,
    },
    skip: !experiences,
  })

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>error...</div>}
      {!loading &&
        !error &&
        data &&
        data.ontologyRelated.relations.map((skill: any, i: number) => (
          <div key={i}>{skill.name}</div>
        ))}
    </div>
  )
}

export default MatchCompetences
