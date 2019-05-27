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
    <Grid justifyContent="center" justifyItems="center" gridGap="medium">
      <img alt="Frågetecken" src={questionMarkIllustration} />
      <H1 mb={0} color="white">
        {title}
      </H1>
      <Paragraph color="white">{info}</Paragraph>
      <Italic color="white">Källa: {source}</Italic>
    </Grid>
  )
}

export default Trivia
