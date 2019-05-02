import React, { useState, FormEvent } from 'react'
import { RouteComponentProps } from '@reach/router'
import Flex from '../../components/Flex'
import clockImage from '../../images/clock.svg'
import { H1 } from '../../components/Typography'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { Link } from '@reach/router'

export const PreviousExperience: React.FC<RouteComponentProps> = () => {
  const [hasPreviousExperiences, setYesButtonActive] = useState(false)
  const [yearsActive, setYearsActive] = useState(0)

  const hasPreviousExperiencesClick = () => {
    console.log('Yes')
    setYesButtonActive(true)
  }

  const noPreviousExperiencesClick = () => {
    console.log('no')
  }

  const onSliderChange = (e: FormEvent<HTMLInputElement>) => {
    console.log('what!', e)
    setYearsActive(parseInt(e.currentTarget.value))
  }

  return (
    <Flex flexDirection={'column'}>
      <img src={clockImage} />
      <H1
        color={'black'}
        fontFamily={'Lato'}
        fontSize={'large'}
        fontWeight={'bold'}
        textAlign={'center'}
      >
        Har du arbetat som Frontendutvecklare tidigare?
      </H1>
      <Flex justifyContent={'space-evenly'}>
        <Button
          onClick={hasPreviousExperiencesClick}
          variant={hasPreviousExperiences ? 'active' : 'inActive'}
        >
          Ja
        </Button>
        <Link to="../beskriv-dig">
          <Button onClick={noPreviousExperiencesClick} variant={'inActive'}>
            Nej
          </Button>
        </Link>
      </Flex>
      {hasPreviousExperiences && (
        <>
          <Flex>
            <Slider
              defaultValue={'0'}
              max={5}
              min={0}
              onInput={onSliderChange}
            />
          </Flex>
          <div>{yearsActive}</div>
        </>
      )}
    </Flex>
  )
}

export default PreviousExperience
