import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType } from '../../generated/myskills.d'
import { GET_TAXONOMY } from '../../graphql/shared/Queries'
import { RouteComponentProps } from '@reach/router'
import ExperienceList from '../../components/ExperienceList/ExperienceList'
import { Paragraph } from '../../components/Typography'
import Grid from '../../components/Grid'
import Input from '../../components/Input'

export const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      term
      years
      taxonomyId
    }
  }
`

export const ADD_EXPERIENCE_API = gql`
  mutation addExperienceApi($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      term
      __typename
      years
      taxonomyId
    }
  }
`

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')

  const addExperience = useMutation(ADD_EXPERIENCE_CLIENT)

  const { data, error, loading } = useQuery(GET_TAXONOMY, {
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
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(target.value)
        }
        placeholder="Sök yrken"
      />

      {loading && <Paragraph>Loading...</Paragraph>}
      {error && <Paragraph>Some error...</Paragraph>}
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
