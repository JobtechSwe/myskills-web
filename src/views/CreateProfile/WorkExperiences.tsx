import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Flex from '../../components/Flex'
import Input from '../../components/Input'
import { H1, Label } from '../../components/Typography'
import { InternalLink } from '../../components/Link'
import Button, { FloatingContinueButton } from '../../components/Button'
import gql from 'graphql-tag'
import Timeline from '../../components/Timeline'

const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      employeerName
      end
      start
      term
    }
  }
`

export const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const initialState = {
    employer: '',
    end: '',
    start: '',
    term: '',
  }

  const [experienceStartFocused, setExperienceStartFocus] = React.useState(
    false
  )
  const [experienceEndFocused, setExperienceEndFocus] = React.useState(false)
  const [tempExp, setTempExp] = React.useState([])

  const [experience, updateExperience] = useState(initialState)

  const [addExperienceActive, setAddExperienceActive] = React.useState(
    experience.employer.length > 0 &&
      experience.end.length > 0 &&
      experience.start.length > 0
  )

  const handleUpdate = (name: string, value: string) => {
    const updated = {
      ...experience,
      [name]: value,
    }

    updateExperience(updated)
  }

  useEffect(() => {
    if (
      experience.employer.length &&
      experience.term.length &&
      experience.start.length
    ) {
      setAddExperienceActive(true)
    } else {
      setAddExperienceActive(false)
    }
  }, [experience])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setTempExp([...tempExp, experience])

    updateExperience(initialState)
  }

  return (
    <Flex flexDirection="column">
      <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
      <Timeline
        entries={tempExp.map(exp => ({
          title: exp.term,
          schoolOrCompany: exp.employer,
          start: exp.start,
          end: exp.end,
        }))}
      />
      <form onSubmit={handleSubmit}>
        <Grid gridGap={6}>
          <Label>Lägg till erfarenhet</Label>
          <Input
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('term', target.value)
            }
            name="term"
            placeholder="Namn på tjänst..."
          />
          <Input
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('employer', target.value)
            }
            name="employer"
            placeholder="Arbetsgivare..."
          />
        </Grid>
        <Grid gridAutoFlow="column" gridGap={6} mt="small">
          <Flex flexDirection="column">
            <Label>Från</Label>
            <Input
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate('start', target.value)
              }
              name="start"
              onBlur={() => setExperienceStartFocus(false)}
              onFocus={() => setExperienceStartFocus(true)}
              placeholder="Startdatum..."
              type={experienceStartFocused ? 'month' : 'text'}
            />
          </Flex>
          <Flex flexDirection="column">
            <Label>Till</Label>
            <Input
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate('end', target.value)
              }
              name="end"
              onBlur={() => setExperienceEndFocus(false)}
              onFocus={() => setExperienceEndFocus(true)}
              placeholder="Slutdatum..."
              type={experienceEndFocused ? 'month' : 'text'}
            />
          </Flex>
        </Grid>

        <Button
          width={'100%'}
          mt={35}
          variant={addExperienceActive ? 'primary' : 'inActive'}
          disabled={!addExperienceActive}
          type="submit"
        >
          Lägg till
        </Button>
      </form>

      <InternalLink to="../utbildning">
        <FloatingContinueButton>Fortsätt</FloatingContinueButton>
      </InternalLink>
    </Flex>
  )
}

export default WorkExperiences
