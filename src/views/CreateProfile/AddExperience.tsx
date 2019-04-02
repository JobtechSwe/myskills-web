import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType } from '../../types'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import AddExperienceList from './AddExperienceList'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`

const Input = styled.input`
  width: 80%;
  height: 30px;
  font-size: 28px;
  border-radius: 5px;
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
    <Wrapper>
      <Input
        name="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Sök yrken"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Some error...</div>}
      {data && data.taxonomy && (
        <AddExperienceList experiences={data.taxonomy.result} />
      )}
    </Wrapper>
  )
}

export default AddExperience
