import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { OntologyType } from '../../generated/myskills.d'
import Loader from '../../components/Loader'
import { RouteComponentProps } from '@reach/router'
import OccupationsList from '../../components/OccupationsList/OccupationsList'
import Grid from '../../components/Grid'
import Input from '../../components/Input'
import { useDebounce } from '@iteam/hooks'
import { Link } from '@reach/router'

export const GET_ONTOLOGY_CONCEPTS = gql`
  query ontologyConcepts($filter: String!, $type: OntologyType) {
    ontologyConcepts(params: { filter: $filter, type: $type }) {
      id
      name
      type
    }
  }
`

export const ADD_OCCUPATION_CLIENT = gql`
  mutation addOccupationClient($occupation: ClientOccupationInput!) {
    addOccupationClient(occupation: $occupation) @client {
      name
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

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only',
  })

  const addOccupation = useMutation(
    isLoggedIn.isLoggedIn ? ADD_OCCUPATION_API : ADD_OCCUPATION_CLIENT
  )

  const { data, error, loading } = useQuery(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: debouncedQuery,
      type: OntologyType.Occupation,
    },
    skip: !debouncedQuery,
  })

  return (
    <Grid>
      <Input
        name="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Sök yrken"
      />

      {loading && <Loader />}
      {error && <div>Some error...</div>}
      {data && data.ontologyConcepts && (
        <OccupationsList
          addOccupation={addOccupation}
          occupations={data.ontologyConcepts}
        />
      )}
      <Link to="/skapa-cv/kompetenser">NÄSTA</Link>
    </Grid>
  )
}

export default AddExperience
