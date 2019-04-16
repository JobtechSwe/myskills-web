import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType } from '../../generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import ExperienceList from '../../components/ExperienceList'
import Flex from '../../components/Flex'
import Input from '../../components/Input'
import { H1, H3 } from '../../components/Typography'
import Button from '../../components/Button'
import styled from '@emotion/styled'

const SearchInput = styled(Input)`
  width: 100%;
`

const NextButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

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
    addExperienceClient(experience: $experience) @client
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

/*
  (always: true) is currently unreliable but Apollo reports bug is fixed in 2.6.0
  https://github.com/apollographql/apollo-client/issues/4636#issuecomment-480307041
*/
export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`

const ChooseProfession: React.FC<RouteComponentProps> = () => {
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
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <H3 mb={20}>YRKE</H3>
      <H1 mb={20}>Vad vill du jobba med?</H1>
      <SearchInput
        name="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Yrkesroll eller yrkesområde"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Some error...</div>}
      {data && data.taxonomy && (
        <ExperienceList
          addExperience={addExperience}
          list={data.taxonomy.result}
        />
      )}
      <NextButton>Nästa</NextButton>
    </Flex>
  )
}

export default ChooseProfession
