import React, { useState } from 'react'
import Grid from './Grid'
import Flex from './Flex'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'
import DatePicker from './DatePicker'

interface AddAndEditFormProps {
  onSubmit: (payload: any) => void
}

export const AddAndEditForm: React.FC<AddAndEditFormProps> = ({ onSubmit }) => {
  const initialState = {
    employer: '',
    end: '',
    start: '',
    term: '',
  }

  const [experience, updateExperience] = useState(initialState)

  const handleUpdate = (name: string, value: string) => {
    const updated = {
      ...experience,
      [name]: value,
    }

    updateExperience(updated)
  }

  const handleSubmit = () => {
    onSubmit(experience)

    updateExperience(initialState)
  }

  return (
    <>
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
      <Grid gridTemplateColumns="1fr 1fr" gridGap={6} mt="small">
        <Flex flexDirection="column">
          <Label>Från</Label>
          <DatePicker
            value={experience.start}
            onChange={value => handleUpdate('start', value)}
            placeholder="Startdatum"
          />
        </Flex>
        <Flex flexDirection="column">
          <Label>Till</Label>
          <DatePicker
            value={experience.end}
            onChange={value => handleUpdate('end', value)}
            placeholder="Slutdatum"
          />
        </Flex>
      </Grid>

      <Button
        mt={35}
        variant="inActive"
        type="submit"
        width={1}
        onClick={handleSubmit}
      >
        Lägg till
      </Button>
    </>
  )
}

export default AddAndEditForm
