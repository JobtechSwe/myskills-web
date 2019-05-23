import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from 'components/Grid'
import Flex from 'components/Flex'
import laptopImage from 'images/laptop.svg'
import { H1, Paragraph } from 'components/Typography'
import Button from 'components/Button'
import Slider from 'components/Slider'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_OCCUPATION_CLIENT } from 'graphql/resolvers/mutations/createOccupation'
import { CREATE_OCCUPATION_CLIENT } from 'views/partials/Profession'
import { FooterButton } from 'components/Layout/Registration'
import styled from '@emotion/styled'

const Image = styled.img`
  width: 100%;
`

interface OccupationExperienceProps {
  buttonText: string
  onSubmit: () => void
}

export const OccupationExperience: React.FC<
  RouteComponentProps & OccupationExperienceProps
> = ({ buttonText, navigate, onSubmit }) => {
  const { data, loading, error } = useQuery(GET_OCCUPATION_CLIENT)
  const setOccupationExperience = useMutation(CREATE_OCCUPATION_CLIENT)

  const yearsActive =
    (data.occupation &&
      data.occupation.experience &&
      data.occupation.experience.years) ||
    0
  const hasPreviousExperiencesClick = () => {
    setOccupationExperience({
      variables: {
        occupation: {
          ...data.occupation,
          experience: {
            years: yearsActive,
          },
        },
      },
    })
  }

  const noPreviousExperienceClick = () => {
    setOccupationExperience({
      variables: {
        occupation: {
          ...data.occupation,
          experience: null,
        },
      },
    })

    navigate('./tidigare-erfarenheter')
    return
  }

  const onSliderChange = (value: number) => {
    setOccupationExperience({
      variables: {
        occupation: {
          ...data.occupation,
          experience: {
            years: value,
          },
        },
      },
    })
  }

  if (!data || loading || error) {
    return null
  }

  if (!data.occupation) {
    navigate('./tidigare-erfarenheter')
    return
  }

  return (
    <>
      <Flex flexDirection="column">
        <Image alt="Clock" src={laptopImage} />
        <H1 textAlign="center">
          Har du arbetat som {data.occupation.term.toLowerCase()} tidigare?
        </H1>

        <Grid gridAutoFlow="column" gridGap={12} justifyContent="center">
          <Button
            onClick={hasPreviousExperiencesClick}
            variant={
              data.occupation.experience &&
              data.occupation.experience.years !== null
                ? 'active'
                : 'inActive'
            }
          >
            Ja
          </Button>
          <Button onClick={noPreviousExperienceClick} variant="inActive">
            Nej
          </Button>
        </Grid>

        {data.occupation.experience &&
          data.occupation.experience.years !== null && (
            <Flex flexDirection="column" mt="small" p="medium">
              <Paragraph>Hur länge har du arbetat med det?</Paragraph>
              <Slider
                defaultValue={yearsActive}
                max={5}
                min={0}
                onInput={onSliderChange}
              />
            </Flex>
          )}
      </Flex>
      <FooterButton onClick={onSubmit} text={buttonText} />
    </>
  )
}

export default OccupationExperience
