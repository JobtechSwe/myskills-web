import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import { useMutation, useQuery } from 'react-apollo-hooks'
import React, { useEffect, useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import styled from '@emotion/styled'
import Header from '../../components/Header'
import { InternalLink } from '../../components/Link'
import { FloatingContinueButton } from '../../components/Button'
import {
  OntologyTextParseResponse,
  Query,
  OntologyType,
} from '../../generated/myskills.d'
import gql from 'graphql-tag'
import { GET_ONTOLOGY_CONCEPTS } from './ChooseProfession'
import TagList from '../../components/TagList'
import { GET_TRAITS_CLIENT } from '../../graphql/resolvers/mutations/addTrait'

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

  const onTagClick = (tag: any) => {
    if (tag.isActive) {
      return removeTrait(tag.term)
    }

    return addTrait(tag.term)
  }

  useEffect(() => {
    setSuggestedTraits(suggestedTraits.filter(t => traits.indexOf(t) === -1))
  }, [traits])

  return (
    <Grid>
      <Header title="Vilka är dina främsta egenskaper?" />
      <TagList
        handleTagClick={onTagClick}
        items={[
          ...traits.map(x => ({ term: x, isActive: true })),
          ...suggestedTraits.map(x => ({ term: x, isActive: false })),
        ]}
      />
      <AddTrait
        onChange={handleChange}
        onKeyUp={handleChange}
        placeholder="Lägg till en annan egenskap"
        value={query}
      />
      <InternalLink to="../kontaktuppgifter">
        <FloatingContinueButton>Fortsätt</FloatingContinueButton>
      </InternalLink>
    </Grid>
  )
}

export default AddTraits
