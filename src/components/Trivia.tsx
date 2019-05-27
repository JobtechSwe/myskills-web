import React from 'react'
import { H1, Paragraph, Italic } from 'components/Typography'
import Grid from 'components/Grid'
import questionMarkIllustration from 'assets/illustrations/question_mark.svg'

interface TriviaProps {
  title: string
  info: string
  source: string
}

const Trivia: React.FC<TriviaProps> = ({ title, info, source }) => {
  return (
    <Grid gridGap="medium" justifyContent="center" justifyItems="center">
      <img alt="Frågetecken" src={questionMarkIllustration} />
      <H1 color="white" mb={0}>
        {title}
      </H1>
      <Paragraph color="white">{info}</Paragraph>
      <Italic color="white">Källa: {source}</Italic>
    </Grid>
  )
}

export default Trivia
