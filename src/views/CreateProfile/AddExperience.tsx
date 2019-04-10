import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType } from '../../types'
import { RouteComponentProps } from '@reach/router'
import ExperienceList from '../../components/ExperienceList/ExperienceList'
import Grid from '../../components/Grid'
import Input from '../../components/Input'

export const GET_EXPERIENCES = gql`
  query taxonomy($q: String!, $type: TaxonomyType) {
    taxonomy(params: { q: $q, type: $type }) {
      result {
        term
        taxonomyId
        type
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
      name
    }
  }
`

export const ADD_EXPERIENCE_API = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      name
    }
  }
`

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN)

  const addExperience = useMutation(
    isLoggedIn.isLoggedIn ? ADD_EXPERIENCE_API : ADD_EXPERIENCE_CLIENT
  )

  const { data, error, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType[TaxonomyType.OCCUPATION_NAME],
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
