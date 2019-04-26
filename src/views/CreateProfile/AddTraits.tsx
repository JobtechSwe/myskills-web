import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import { useMutation, useQuery } from 'react-apollo-hooks'
import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { OntologyTextParseResponse } from '../../generated/myskills'
import gql from 'graphql-tag'

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

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: red;
  justify-content: space-between;
  border-radius: 5px;

  & * {
    margin: 5px 10px;
  }
`

const TagClose = styled.div`
  cursor: pointer;
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

  const { data: { traits = [] } = { traits: [] } } = useQuery(GET_TRAITS)

  const addTraitMutation = useMutation(ADD_TRAIT)
  const removeTraitMutation = useMutation(REMOVE_TRAIT)

  const addTrait = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      addTraitMutation({
        variables: {
          trait: e.currentTarget.value,
        },
      })
      e.currentTarget.value = ''
    }
  }

  useEffect(() => {
    navigationTraits.map(trait =>
      addTraitMutation({
        variables: {
          trait: trait.term,
        },
      })
    )
  }, [navigationTraits])

  const onTagClick = (trait: string) => {
    removeTraitMutation({
      variables: {
        trait,
      },
    })
  }

  return (
    <Grid>
      <Header title="Vilka är dina främsta egenskaper?" />
      <Tags>
        {traits.map((trait: string, i: number) => (
          <TagContainer key={i}>
            <Tag>{trait}</Tag>
            <TagClose onClick={() => onTagClick(trait)}>X</TagClose>
          </TagContainer>
        ))}
      </Tags>
      <AddTrait onKeyUp={addTrait} placeholder="Lägg till en annan egenskap" />
      <Footer>
        <BackButton onClick={() => history.back()}>BAKÅT</BackButton>
        <NextButton onClick={() => null}>NÄSTA</NextButton>
      </Footer>
    </Grid>
  )
}

export default AddTraits
