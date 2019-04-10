import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType } from '../../generated/myskills.d'
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
      term
    }
  }
`

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const { data, error, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType.OccupationName,
    },
    skip: !query,
  })
  const addExperienceMutaion = useMutation(ADD_EXPERIENCE_CLIENT)

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
          addExperience={addExperienceMutaion}
          list={data.taxonomy.result}
        />
      )}
    </Grid>
  )
}

export default AddExperience
