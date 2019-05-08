import { RouteComponentProps } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Grid from '../../components/Grid'
import React, { useState, useRef, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useDebounce } from '@iteam/hooks'
import { theme } from '../../theme'
import styled from '@emotion/styled'
import { H1, Bold, Paragraph } from '../../components/Typography'
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

const TextAreaContainer = styled(Grid)`
  position: relative;
  background: white;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  const handleContentUpdate = () => {
    if (!textArea.current) return

    const value = textArea.current.innerText

    setDescription(value)

    if (charsLeft >= 0) {
      addWhoAmI({
        variables: {
          whoAmI: value,
        },
      })
    }
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
    <RegistrationLayout
      childFnArgs={{
        state: {
          traits,
        },
      }}
      headerText="PERSON"
      nextPath="egenskaper"
      step={5}
    >
      <Grid>
        <H1 textAlign="center">Vem är du?</H1>
        <Paragraph textAlign="center">
          Beskriv dig själv och hur du är som person! Baserat på din text kommer
          du att få förslag på egenskaper som speglar din personlighet.
        </Paragraph>
        <TextAreaContainer gridGap={6}>
          <ContentEditable
            html={staticHtml}
            innerRef={textArea}
            onChange={handleContentUpdate}
            style={{
              border: `1px solid ${theme.colors.alabaster}`,
              borderRadius: '4px',
              height: '30vh',
              padding: '12px',
              width: '100%',
            }}
          />
          <Paragraph textAlign="right">
            <Bold
              as="span"
              color={charsLeft > 0 ? 'black' : 'orangeRed'}
              fontSize="small"
            >
              {charsLeft}{' '}
            </Bold>
            (280)
          </Paragraph>
        </TextAreaContainer>
        <Footer />
      </Grid>
    </RegistrationLayout>
  )
}

export default WhoAmI
