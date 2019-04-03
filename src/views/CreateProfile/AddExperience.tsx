import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { TaxonomyType } from '../../types'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { Taxonomy } from '../../generated/myskills'
import { Grid } from '../../components/Grid'
import Input from '../../components/Input'
import List from '../../components/List'

export const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      name
    }
  }
`

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

export const GET_EXPERIENCES_CLIENT = gql`
  query getExperiences {
    experiences @client
  }
`

export const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) @client
  }
`

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')

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
        <List>
          {data.taxonomy.result.map(
            (experience: Taxonomy.Result, i: number) => (
              <li key={i}>
                <Mutation
                  mutation={ADD_EXPERIENCE_CLIENT}
                  variables={{
                    experience: {
                      name: experience.term,
                      years: '',
                      taxonomyId: experience.taxonomyId,
                    },
                  }}
                >
                  {(addExperience, { error, loading }) => {
                    if (loading) {
                      return <p>Loading...</p>
                    }

                    if (error) {
                      return <p>That’s an error.</p>
                    }

                    return (
                      <button onClick={() => addExperience()}>
                        {experience.term}
                      </button>
                    )
                  }}
                </Mutation>
              </li>
            )
          )}
        </List>
      )}
    </Grid>
  )
}

export default AddExperience
