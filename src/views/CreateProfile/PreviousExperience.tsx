import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Flex from '../../components/Flex'
import laptopImage from '../../images/laptop.svg'
import { H1, Paragraph } from '../../components/Typography'
import Button, { FloatingContinueButton } from '../../components/Button'
import Slider from '../../components/Slider'
import { InternalLink } from '../../components/Link'
import { useQuery } from 'react-apollo-hooks'
import { GET_OCCUPATION_CLIENT } from '../../graphql/resolvers/mutations/createOccupation'

export const PreviousExperience: React.FC<RouteComponentProps> = ({
  navigate,
}) => {
  const [hasPreviousExperiences, setYesButtonActive] = React.useState(false)
  const [_yearsActive, setYearsActive] = React.useState(0)

  const hasPreviousExperiencesClick = () => {
    setYesButtonActive(true)
  }

  const onSliderChange = (value: number) => {
    setYearsActive(value)
  }

  const { data, loading, error } = useQuery(GET_OCCUPATION_CLIENT)

  if (!data || loading || error) {
    return null
  }

  if (!data.occupation) {
    navigate('./tidigare-erfarenheter')
    return
  }

  return (
    <Flex flexDirection="column">
      <img alt="Clock" src={laptopImage} />
      <H1 textAlign="center">
        Har du arbetat som {data.occupation.term.toLowerCase()} tidigare?
      </H1>

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
      <InternalLink to="./tidigare-erfarenheter">
        <FloatingContinueButton>Fortsätt</FloatingContinueButton>
      </InternalLink>
    </Flex>
  )
}

export default PreviousExperience
