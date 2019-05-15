import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import { v4 } from 'uuid'
import { useMutation, useQuery } from 'react-apollo-hooks'
import React, { useEffect, useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import styled from '@emotion/styled'
import { H1 } from '../../components/Typography'
import {
  OntologyTextParseResponse,
  Query,
  OntologyType,
} from '../../generated/myskills.d'
import gql from 'graphql-tag'
import { GET_ONTOLOGY_CONCEPTS } from './ChooseProfession'
import { GET_TRAITS_CLIENT } from '../../graphql/resolvers/mutations/addTrait'
import TagList from '../../components/TagList'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

const AddTrait = styled.input``

export const ADD_TRAIT = gql`
  mutation addTrait($trait: String!) {
    addTrait(trait: $trait) @client
  }
`

export const REMOVE_TRAIT = gql`
  mutation removeTrait($trait: String!) {
    removeTrait(trait: $trait) @client
  }
`

const AddTraits: React.FC<RouteComponentProps> = ({ location }) => {
  const navigationTraits: OntologyTextParseResponse[] =
    (location && location.state && location.state.traits) || []

  const { data: { traits = [] } = { traits: [] as string[] } } = useQuery(
    GET_TRAITS_CLIENT
  )
  const [query, setQuery] = useState('')

  const { data: ontologyRelated } = useQuery<{
    ontologyConcept: Query['ontologyConcept']
  }>(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: useDebounce(query, 500),
      type: OntologyType.Trait,
    },
    skip: !query,
  })

  const [suggestedTraits, setSuggestedTraits] = useState(
    navigationTraits.map(t => t.term)
  )

  const addTraitMutation = useMutation(ADD_TRAIT)
  const removeTraitMutation = useMutation(REMOVE_TRAIT)

  const handleChange = (e: any) => {
    if (e.keyCode && e.keyCode === 13) {
      addTrait(query)
      setQuery('')
    } else {
      setQuery(e.currentTarget.value)
    }
  }

  const removeTrait = (trait: string) => {
    removeTraitMutation({
      variables: {
        trait,
      },
    })

    setSuggestedTraits([...suggestedTraits, trait])
  }

  const addTrait = (trait: string) => {
    addTraitMutation({
      variables: {
        trait,
      },
    })

    setSuggestedTraits(suggestedTraits.filter(t => t !== trait))
  }

  const onTagClick = (tag: { id: string; term: string }) => {
    if (traits.some(t => t === tag.term)) {
      return removeTrait(tag.term)
    }

    return addTrait(tag.term)
  }

  useEffect(() => {
    setSuggestedTraits(suggestedTraits.filter(t => traits.indexOf(t) === -1))
  }, [traits])

  return (
    <RegistrationLayout headerText="PERSON" nextPath="kontakt" step={5}>
      <Grid alignItems="start" justifyContent="start">
        <H1 textAlign="center">Vilka är dina främsta egenskaper?</H1>
        <TagList
          activeItems={traits.map(trait => ({ id: v4(), term: trait }))}
          items={suggestedTraits.map(trait => ({ id: v4(), term: trait }))}
          onSelect={onTagClick}
        />
        <AddTrait
          onChange={handleChange}
          onKeyUp={handleChange}
          placeholder="Lägg till en annan egenskap"
          value={query}
        />
      </Grid>
    </RegistrationLayout>
  )
}

export default AddTraits
