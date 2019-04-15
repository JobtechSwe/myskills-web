import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType } from '../../generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import ExperienceList from '../../components/ExperienceList/ExperienceList'
import Grid from '../../components/Grid'
import Input from '../../components/Input'

export const GET_TAXONOMY_EXPERIENCES = gql`
  query taxonomy($q: String!, $type: TaxonomyType) {
    taxonomy(params: { q: $q, type: $type }) {
      result {
        term
        taxonomyId
        ... on TaxonomyDefaultResult {
          parentId
        }
      }
    }
  }
`

export const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperience(experience: $experience) @client {
      term
    }
  }
`

export const ADD_EXPERIENCE_API = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      term
    }
  }
`
/* 
  (always: true) is currently unreliable but Apollo reports bug is fixed in 2.6.0
  https://github.com/apollographql/apollo-client/issues/4636#issuecomment-480307041
*/
export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`
const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only',
  })

  const addExperience = useMutation(
    isLoggedIn.isLoggedIn ? ADD_EXPERIENCE_API : ADD_EXPERIENCE_CLIENT
  )

  const { data, error, loading } = useQuery(GET_TAXONOMY_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType.OccupationName,
    },
    skip: !query,
  })

  return (
    <Grid>
      <Input
        name="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Sök yrken"
      />

      {loading && <div>Loading...</div>}
      {error && <div>Some error...</div>}
      {data && data.taxonomy && (
        <ExperienceList
          addExperience={addExperience}
          list={data.taxonomy.result}
        />
      )}
    </Grid>
  )
}

export default AddExperience
