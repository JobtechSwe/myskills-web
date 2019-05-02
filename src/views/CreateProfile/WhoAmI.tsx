import { RouteComponentProps } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Grid from '../../components/Grid'
import React, { useState, useRef, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useDebounce } from '@iteam/hooks'
import styled from '@emotion/styled'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { navigate } from '@reach/router'
import {
  QueryOntologyTextParseArgs,
  Query,
  OntologyTextParseResponse,
} from '../../generated/myskills'
import ContentEditable from 'react-contenteditable'
import { GET_WHO_AM_I_CLIENT } from '../../graphql/resolvers/mutations/addWhoAmI'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

export const GET_TRAITS = gql`
  query ontologyTextParse($text: String!) {
    ontologyTextParse(text: $text) {
      id
      term
      type
      terms
    }
  }
`

const TextAreaDescription = styled.span`
  font-weight: bold;
`

const TextAreaContainer = styled.div`
  position: relative;
  background: white;
  display: flex;
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

const TagSpan = styled.span`
  font-weight: 700;
  color: red;
`

export const ADD_WHO_AM_I = gql`
  mutation addWhoAmI($whoAmI: String!) {
    addWhoAmI(whoAmI: $whoAmI) @client
  }
`

const renderToStatic = (
  description: string,
  traits: OntologyTextParseResponse[] = []
): string =>
  traits.reduce(
    (prev, curr) =>
      prev.replace(new RegExp(curr.term, 'gi'), w =>
        ReactDOMServer.renderToString(<TagSpan>{w}</TagSpan>)
      ),
    description
  )

const WhoAmI: React.FC<RouteComponentProps> = () => {
  const textArea = useRef<HTMLInputElement>(null)
  const { data: whoAmIResult } = useQuery(GET_WHO_AM_I_CLIENT)

  const [description, setDescription] = useState(whoAmIResult.whoAmI)

  const [traits, setTraits] = useState<OntologyTextParseResponse[]>([])
  const [charsLeft, setCharsLeft] = useState(280)

  const addWhoAmI = useMutation(ADD_WHO_AM_I, {
    variables: description,
  })

  const { data } = useQuery<
    { ontologyTextParse: Query['ontologyTextParse'] },
    QueryOntologyTextParseArgs
  >(GET_TRAITS, {
    variables: {
      text: useDebounce(description, 500),
    },
    skip: !useDebounce(description, 500),
  })

  const Update = () => {
    if (!textArea.current) return
    const value = textArea.current.innerText

    setDescription(value)

    addWhoAmI({
      variables: {
        whoAmI: value,
      },
    })
  }

  useEffect(() => {
    setCharsLeft(280 - description.length)
  }, [description])

  const staticHtml = React.useMemo(() => renderToStatic(description, traits), [
    traits,
    description,
  ])

  useEffect(() => {
    if (!data || !data.ontologyTextParse) return
    setTraits(data.ontologyTextParse as OntologyTextParseResponse[])
  }, [data])

  return (
    <RegistrationLayout nextPath="egenskaper" step={5}>
      <Grid>
        <Header title="Vem är Du?" />
        <TextAreaDescription>Beskriv dig själv kortfattat</TextAreaDescription>
        <TextAreaContainer>
          <ContentEditable
            html={staticHtml}
            innerRef={textArea}
            onChange={Update}
            style={{
              width: '100%',
              height: '280px',
            }}
          />
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
    </RegistrationLayout>
  )
}

export default WhoAmI
