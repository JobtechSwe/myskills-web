import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { OntologyType } from '../../generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import OccupationsList from '../../components/OccupationsList/OccupationsList'
import Flex from '../../components/Flex'
import Input from '../../components/Input'
import { H1, H3 } from '../../components/Typography'
import Button, { FloatingContinueButton } from '../../components/Button'
import styled from '@emotion/styled'
import { InternalLink } from '../../components/Link'
import ChosenOccupations from '../../components/ChosenOccupations'

const SearchInput = styled(Input)`
  width: 100%;
`

export const GET_ONTOLOGY_CONCEPTS = gql`
  query ontologyConcepts($filter: String!, $type: OntologyType) {
    ontologyConcepts(params: { filter: $filter, type: $type }) {
      id
      term
      type
    }
  }
`

export const ADD_OCCUPATION_CLIENT = gql`
  mutation addOccupationClient($occupation: ClientOccupationInput!) {
    addOccupationClient(occupation: $occupation) @client {
      term
      type
      id
    }
  }
`

export const ADD_OCCUPATION_API = gql`
  mutation addExperienceApi($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      term
      years
      id
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
  // TODO: Use debounce, skipping for now because of complications in tests
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only',
  })

  const addOccupation = useMutation(
    isLoggedIn.isLoggedIn ? ADD_OCCUPATION_API : ADD_OCCUPATION_CLIENT
  )

  const { data, error, loading } = useQuery(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: query,
      type: OntologyType.Occupation,
    },
    skip: !query,
  })

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <H3 mb={20}>YRKE</H3>
      <H1 mb={20}>Vad vill du jobba med?</H1>
      <SearchInput
        name="search"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
        placeholder="Yrkesroll eller yrkesområde"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Some error...</div>}
      {data && data.ontologyConcepts && (
        <OccupationsList
          addOccupation={addOccupation}
          occupations={data.ontologyConcepts}
        />
      )}
      <ChosenOccupations />
      <InternalLink to="/skapa-cv/kompetenser">
        <FloatingContinueButton>Nästa</FloatingContinueButton>
      </InternalLink>
    </Flex>
  )
}

export default ChooseProfession
