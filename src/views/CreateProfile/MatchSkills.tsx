import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import gql from 'graphql-tag'
import { withApollo, WithApolloClient, graphql } from 'react-apollo'
import { useQuery } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import { GET_OCCUPATIONS_CLIENT } from '../../graphql/resolvers/mutations/addOccupation'
import SkillsList from '../../components/SkillsList'
import Grid from '../../components/Grid'
import { OntologyType } from '../../generated/myskills.d'

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
  mutation addSkill($skill: String!) {
    addSkill(skill: $skill) @client {
      name
      type
      id
    }
  }
`

const getName = (related: any) => related.map((t: any) => t.name)

const MatchCompetences: React.FC<WithApolloClient<RouteComponentProps>> = ({
  client,
}: any) => {
  const {
    data: { occupations = [] },
  }: any = useQuery(GET_OCCUPATIONS_CLIENT)

  const [relatedSkills, setRelatedSkills]: any = useState([])
  const [loading, setLoading]: any = useState(false)

  const getRelatedSkills = async (skills: string[]) => {
    setLoading(true)
    const { data, _, error } = await client.query({
      query: GET_RELATED_SKILLS,
      variables: {
        concepts: skills,
        limit: 5,
        type: OntologyType.Skill,
      },
    })

    setRelatedSkills([
      ...new Set([
        ...relatedSkills,
        ...getName(data.ontologyRelated.relations),
      ]),
    ])
    setLoading(false)
  }

  useEffect(() => {
    getRelatedSkills(getName(occupations))
  }, [occupations])

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      style={{ width: '100vw' }}
    >
      {relatedSkills.length > 0 && (
        <SkillsList getSkills={getRelatedSkills} skills={relatedSkills} />
      )}
      {loading && <Loader />}
    </Grid>
  )
}

export default withApollo(MatchCompetences)
