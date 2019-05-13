import React, { useState } from 'react'
import Grid from './Grid'
import Flex from './Flex'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'

interface AddAndEditFormProps {
  handleSubmit: any
}

export const AddAndEditForm: React.FC<AddAndEditFormProps> = ({
  handleSubmit,
}) => {
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
  const handleUpdate = (name: string, value: string) => {
    const updated = {
      ...experience,
      [name]: value,
    }

    updateExperience(updated)
  }

  return (
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

      <Button mt={35} type="submit" width={'100%'}>
        Lägg till
      </Button>
    </form>
  )
}

export default AddAndEditForm
