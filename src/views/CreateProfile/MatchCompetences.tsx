import React from 'react'
import Loader from '../../components/Loader'
import gql from 'graphql-tag'

import { useQuery } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import { GET_OCCUPATIONS_CLIENT } from '../../graphql/resolvers/mutations/addOccupation'
import { ClientOntologyConceptProps } from '../../graphql/types'
import {
  OntologyRelatedInput,
  OntologyRelatedResponse,
  OntologyType,
} from '../../generated/myskills.d'

const GET_RELATED_SKILLS = gql`
  query ontologyRelated($concepts: [String!], $limit: Int) {
    ontologyRelated(
      params: { concepts: $concepts, type: SKILL, limit: $limit }
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

const MatchCompetences: React.FC<RouteComponentProps> = () => {
  const {
    data: { occupations = [] },
  }: any = useQuery(GET_OCCUPATIONS_CLIENT)

  const terms = occupations.map((t: ClientOntologyConceptProps) => t.name)

  const { data, loading, error } = useQuery<
    { ontologyRelated: OntologyRelatedResponse },
    OntologyRelatedInput
  >(GET_RELATED_SKILLS, {
    variables: {
      concepts: terms,
      type: OntologyType.Skill,
      limit: 10,
    },
    skip: !occupations.length,
  })

  return (
    <div>
      {loading && <Loader />}
      {error && <div>error...</div>}
      {data &&
        data.ontologyRelated &&
        data.ontologyRelated.relations.map((skill: any, i: number) => (
          <div key={i}>{skill.name}</div>
        ))}
    </div>
  )
}

export default MatchCompetences
