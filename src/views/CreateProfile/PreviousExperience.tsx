import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Flex from '../../components/Flex'
import laptopImage from '../../images/laptop.svg'
import { H1, Paragraph } from '../../components/Typography'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { InternalLink } from '../../components/Link'

export const PreviousExperience: React.FC<RouteComponentProps> = () => {
  const [hasPreviousExperiences, setYesButtonActive] = React.useState(false)
  const [_yearsActive, setYearsActive] = React.useState(0)

  const hasPreviousExperiencesClick = () => {
    setYesButtonActive(true)
  }

  const onSliderChange = (value: number) => {
    setYearsActive(value)
  }

  return (
    <Flex flexDirection="column">
      <img alt="Clock" src={laptopImage} />
      <H1 textAlign="center">Har du arbetat som det tidigare?</H1>

      <Grid gridAutoFlow="column" gridGap={12} justifyContent="center">
        <Button
          onClick={hasPreviousExperiencesClick}
          variant={hasPreviousExperiences ? 'active' : 'inActive'}
        >
          Ja
        </Button>
        <InternalLink to="./tidigare-erfarenheter">
          <Button variant="inActive">Nej</Button>
        </InternalLink>
      </Grid>

      {hasPreviousExperiences && (
        <Flex flexDirection="column" mt="small" p="medium">
          <Paragraph>Hur länge har du arbetat med det?</Paragraph>
          <Slider defaultValue={0} max={5} min={0} onInput={onSliderChange} />
        </Flex>
      )}
    </Flex>
  )
}

export default PreviousExperience
