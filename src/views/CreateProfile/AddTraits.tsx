import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import { useMutation, useQuery } from 'react-apollo-hooks'
import React, { useEffect, useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import styled from '@emotion/styled'
import Header from '../../components/Header'
import Button from '../../components/Button'
import {
  OntologyTextParseResponse,
  Query,
  OntologyType,
} from '../../generated/myskills.d'
import gql from 'graphql-tag'
import { GET_ONTOLOGY_CONCEPTS } from './ChooseProfession'

interface TagContainerProps {
  active?: boolean
}

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const NextButton = styled(Button)`
  background: black;
  color: white;
`

const BackButton = styled(Button)`
  background: white;
  color: black;
`

const TagContainer = styled.div<TagContainerProps>`
  display: flex;
  flex-direction: row;
  background: ${(props: any) => (props.active ? 'green' : 'lightgrey')};
  justify-content: space-between;
  border-radius: 8px;

  & * {
    margin: 5px 10px;
  }
`

const Tag = styled.div`
  color: white;
`

const Tags = styled.div`
  display: flex;
  flex-direction: row;

  & * {
    margin-right: 10px;
  }
`

const AddTrait = styled.input``

export const ADD_TRAIT = gql`
  mutation addTrait($trait: string!) {
    addTrait(trait: $trait) @client
  }
`

export const REMOVE_TRAIT = gql`
  mutation removeTrait($trait: string!) {
    removeTrait(trait: $trait) @client
  }
`

export const GET_TRAITS = gql`
  query getTraits {
    traits @client
  }
`

const AddTraits: React.FC<RouteComponentProps> = ({ location }) => {
  const navigationTraits: OntologyTextParseResponse[] =
    (location && location.state && location.state.traits) || []

  const { data: { traits = [] } = { traits: [] as string[] } } = useQuery(
    GET_TRAITS
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
      addTraitMutation({
        variables: {
          trait: query,
        },
      })
      setQuery('')
    } else {
      setQuery(e.currentTarget.value)
    }
  }

  const onTraitTagClick = (trait: string) => {
    removeTraitMutation({
      variables: {
        trait,
      },
    })

    setSuggestedTraits([...suggestedTraits, trait])
  }

  const onSuggestionTagClick = (trait: string) => {
    addTraitMutation({
      variables: {
        trait,
      },
    })

    setSuggestedTraits(suggestedTraits.filter(t => t !== trait))
  }

  useEffect(() => {
    setSuggestedTraits(suggestedTraits.filter(t => traits.indexOf(t) === -1))
  }, [traits])

  return (
    <Grid>
      <Header title="Vilka är dina främsta egenskaper?" />
      <Tags>
        <div>sparade traits: </div>
        {traits.map((trait: string, i: number) => (
          <TagContainer
            active={false}
            key={i}
            onClick={() => onTraitTagClick(trait)}
          >
            <Tag>{trait}</Tag>
          </TagContainer>
        ))}
      </Tags>
      <Tags>
        <div>förslag: </div>
        {suggestedTraits.map((trait, i: number) => (
          <TagContainer key={i} onClick={() => onSuggestionTagClick(trait)}>
            <Tag>{trait}</Tag>
          </TagContainer>
        ))}
      </Tags>
      <AddTrait
        onChange={handleChange}
        onKeyUp={handleChange}
        placeholder="Lägg till en annan egenskap"
        value={query}
      />
      <Footer>
        <BackButton onClick={() => history.back()}>BAKÅT</BackButton>
        <NextButton onClick={() => null}>NÄSTA</NextButton>
      </Footer>
    </Grid>
  )
}

export default AddTraits
