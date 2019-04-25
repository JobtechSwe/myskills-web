import { RouteComponentProps } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Grid from '../../components/Grid'
import React, { useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import styled from '@emotion/styled'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { navigate } from '@reach/router'
import { QueryOntologyTextParseArgs, Query } from '../../generated/myskills'

export const GET_TRAITS = gql`
  query ontologyTextParse($text: String!) {
    ontologyTextParse(text: $text) {
      id
      name
      type
      terms
    }
  }
`

const TextAreaDescription = styled.span`
  font-weight: bold;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`

const TextAreaContainer = styled.div`
  position: relative;
  background: white;
  display: flex;
  height: 100px;
`

const CharsLeft = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
`

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

export const ADD_WHO_AM_I = gql`
  mutation addWhoAmI($whoAmI: string!) {
    addWhoAmI(whoAmI: $whoAmI) @client
  }
`

export const GET_WHO_AM_I = gql`
  query getWhoAmI {
    whoAmI @client
  }
`

const WhoAmI: React.FC<RouteComponentProps> = () => {
  const { data: whoAmIResult } = useQuery(GET_WHO_AM_I)

  const [query, setQuery] = useState(whoAmIResult.whoAmI)

  const [traits, setTraits] = useState<Query['ontologyTextParse']>([])
  const [charsLeft, setCharsLeft] = useState(280)

  const addWhoAmI = useMutation(ADD_WHO_AM_I, {
    variables: query,
  })

  const { data, error, loading } = useQuery<
    { ontologyTextParse: Query['ontologyTextParse'] },
    QueryOntologyTextParseArgs
  >(GET_TRAITS, {
    variables: {
      text: useDebounce(query, 500),
    },
    skip: !useDebounce(query, 500),
  })

  const Update = (e: any) => {
    const value = e.target.value
    setCharsLeft(280 - value.length)
    setQuery(value)

    addWhoAmI({
      variables: {
        whoAmI: value,
      },
    })
  }

  if (!error && !loading && data && data.ontologyTextParse) {
    if (JSON.stringify(traits) !== JSON.stringify(data.ontologyTextParse)) {
      setTraits(data.ontologyTextParse)
    }
  }

  return (
    <Grid>
      <Header title="Vem är Du?" />
      <TextAreaDescription>Beskriv dig själv kortfattat</TextAreaDescription>
      <TextAreaContainer>
        <TextArea defaultValue={query} onChange={Update} />
        <CharsLeft>{charsLeft} tecken kvar</CharsLeft>
      </TextAreaContainer>
      <Footer>
        <BackButton onClick={() => history.back()}>BAKÅT</BackButton>
        <NextButton
          onClick={() =>
            navigate('./egenskaper', {
              state: {
                traits,
              },
            })
          }
        >
          NÄSTA
        </NextButton>
      </Footer>
    </Grid>
  )
}

export default WhoAmI
