import React from 'react'
import { H1, Paragraph, Italic } from 'components/Typography'
import Grid from 'components/Grid'
import questionMarkIllustration from 'assets/illustrations/question_mark.svg'
import styled from '@emotion/styled'

const TriviaImage = styled.img`
  margin-bottom: 24px;
`

interface TriviaProps {
  title: string
  info: string
  source: string
}

const Trivia: React.FC<TriviaProps> = ({ title, info, source }) => {
  return (
    <Grid gridGap="large" justifyContent="center" justifyItems="center">
      <TriviaImage alt="Frågetecken" src={questionMarkIllustration} />
      <H1 color="white" mb={0}>
        {title}
      </H1>
      <Paragraph color="white" my={0} textAlign="center">
        {info}
      </Paragraph>
      <Italic color="white">Källa: {source}</Italic>
    </Grid>
  )
}

export default Trivia
