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
import { useMutation, useQuery } from 'react-apollo-hooks'
import { GET_EXPERIENCES_CLIENT } from '../../graphql/resolvers/mutations/addExperience'
import { Experience } from '../../generated/myskills'

const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      employer
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

  const [experience, updateExperience] = useState(initialState)

  const [addExperienceActive, setAddExperienceActive] = React.useState(
    experience.employer.length > 0 &&
      experience.end.length > 0 &&
      experience.start.length > 0
  )

  const addExperienceClient = useMutation(ADD_EXPERIENCE_CLIENT)
  const {
    data: { experiences },
  } = useQuery(GET_EXPERIENCES_CLIENT)

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

    addExperienceClient({
      variables: { experience },
    })

    updateExperience(initialState)
  }

  return (
    <Flex flexDirection="column">
      <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
      <Timeline
        entries={experiences.map((exp: Experience) => ({
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
            name="term"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('term', target.value)
            }
            placeholder="Namn på tjänst..."
            value={experience.term}
          />
          <Input
            name="employer"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('employer', target.value)
            }
            placeholder="Arbetsgivare..."
            value={experience.employer}
          />
        </Grid>
        <Grid gridAutoFlow="column" gridGap={6} mt="small">
          <Flex flexDirection="column">
            <Label>Från</Label>
            <Input
              name="start"
              onBlur={() => setExperienceStartFocus(false)}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate('start', target.value)
              }
              onFocus={() => setExperienceStartFocus(true)}
              placeholder="Startdatum..."
              type={experienceStartFocused ? 'month' : 'text'}
              value={experience.start}
            />
          </Flex>
          <Flex flexDirection="column">
            <Label>Till</Label>
            <Input
              name="end"
              onBlur={() => setExperienceEndFocus(false)}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate('end', target.value)
              }
              onFocus={() => setExperienceEndFocus(true)}
              placeholder="Slutdatum..."
              type={experienceEndFocused ? 'month' : 'text'}
              value={experience.end}
            />
          </Flex>
        </Grid>

        <Button
          disabled={!addExperienceActive}
          mt={35}
          type="submit"
          variant={addExperienceActive ? 'primary' : 'inActive'}
          width={'100%'}
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
