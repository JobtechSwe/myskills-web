import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '@iteam/hooks'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from '@emotion/styled'
import ExperienceList from './ExperienceList'
import { TaxonomyType } from '../../types'
import Input from '../../components/Input/Input'

const InputLabel = styled.label`
  color: white;
  font-family: 'Arial';
  font-weight: bold;
  margin-bottom: 5px;
`

const GET_EXPERIENCES = gql`
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

const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      name
    }
  }
`

const arrayToJson = (old: any, data: any) =>
  JSON.stringify([...JSON.parse(old), data])

const AddExperience: React.FunctionComponent = ({ mutate }: any) => {
  const [query, setQuery] = useState('')

  const [experiences, setExperiences] = useLocalStorage(
    'experiences',
    localStorage.getItem('experiences') || JSON.stringify([])
  )

  const { data, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType[TaxonomyType.OCCUPATION_NAME],
    },
  })

  // TODO(@all): Break this out to a separate function or handle it in a global-way
  const handleSetExperiences = (data: any) =>
    setExperiences(
      arrayToJson(experiences, {
        taxonomyId: data.taxonomyId,
        name: data.term,
        years: '2',
      })
    )

  return (
    <>
      <InputLabel>Sök yrken:</InputLabel>
      <Input name="search" onChange={({ target }) => setQuery(target.value)} />

      {data.taxonomy && !loading && (
        <ExperienceList
          experiences={data.taxonomy.result}
          handleSetExperiences={handleSetExperiences}
        />
      )}

      {loading && <div>Loading...</div>}
    </>
  )
}

const AddExperienceWithMutation = graphql(ADD_EXPERIENCE)(AddExperience)

export default AddExperienceWithMutation
