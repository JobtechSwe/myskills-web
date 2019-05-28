import { RouteComponentProps } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import Grid from 'components/Grid'
import React, { useState, useRef, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useDebounce } from '@iteam/hooks'
import { theme } from 'theme'
import styled from '@emotion/styled'
import { ADD_WHO_AM_I } from 'graphql/shared/Mutations'
import { GET_TRAITS } from 'graphql/shared/Queries'
import { FooterButton } from 'components/Layout/Registration'
import { H1, Bold, Paragraph } from 'components/Typography'
import {
  QueryOntologyTextParseArgs,
  Query,
  OntologyTextParseResponse,
  AddWhoAmIMutation,
  AddWhoAmIMutationVariables,
} from 'generated/myskills'
import ContentEditable from 'react-contenteditable'

const TextAreaContainer = styled(Grid)`
  background: white;
  position: relative;
`

const TagSpan = styled.span`
  color: ${theme.colors.redOrange};
  font-weight: 700;
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

interface WhoAmIProps {
  buttonText: string
  onSubmit: (traits: OntologyTextParseResponse[]) => void
  personalDescription: string
}

const WhoAmI: React.FC<RouteComponentProps & WhoAmIProps> = ({
  buttonText,
  onSubmit,
  personalDescription,
}) => {
  const textArea = useRef<HTMLInputElement>(null)

  const [description, setDescription] = useState(personalDescription)

  const [traits, setTraits] = useState<OntologyTextParseResponse[]>([])
  const [charsLeft, setCharsLeft] = useState(280)

  const addWhoAmI = useMutation<AddWhoAmIMutation, AddWhoAmIMutationVariables>(
    ADD_WHO_AM_I,
    {
      variables: {
        whoAmI: description,
      },
    }
  )

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
        variables: { whoAmI: value },
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
    <>
      <Grid alignContent="start">
        <Grid alignItems="center" gridGap="medium" justifyContent="center">
          <H1 mb={0} textAlign="center">
            Vem är du?
          </H1>
          <Paragraph my={0} textAlign="center">
            Beskriv dig själv och hur du är som person! Baserat på din text
            kommer du att få förslag på egenskaper som speglar din personlighet.
          </Paragraph>
          <TextAreaContainer gridGap={6}>
            <ContentEditable
              html={staticHtml}
              innerRef={textArea}
              onChange={handleContentUpdate}
              style={{
                border: `1px solid ${theme.colors.alto}`,
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
        </Grid>
      </Grid>
      <FooterButton
        onClick={() => onSubmit(traits as OntologyTextParseResponse[])}
        text={buttonText}
      />
    </>
  )
}

export default WhoAmI
