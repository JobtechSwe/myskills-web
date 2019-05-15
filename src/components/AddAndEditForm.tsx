import React, { useState } from 'react'
import Grid from './Grid'
import Flex from './Flex'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'
import DatePicker from './DatePicker'

interface AddAndEditFormProps {
  titlePlaceholder: string
  schoolOrCompanyPlaceholder: string
  label: string
  onSubmit: (payload: any) => void
}

export const AddAndEditForm: React.FC<AddAndEditFormProps> = ({
  titlePlaceholder,
  schoolOrCompanyPlaceholder,
  label,
  onSubmit,
}) => {
  const initialState = {
    schoolOrCompany: '',
    end: '',
    start: '',
    title: '',
  }

  const [state, updateState] = useState(initialState)

  const handleUpdate = (name: string, value: string) => {
    const updated = {
      ...state,
      [name]: value,
    }

    updateState(updated)
  }

  const handleSubmit = () => {
    onSubmit(state)

    updateState(initialState)
  }

  return (
    <>
      <Grid gridGap={6}>
        <Label>{label}</Label>
        <Input
          name="title"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdate('title', target.value)
          }
          placeholder={titlePlaceholder}
          value={state.title}
        />
        <Input
          name="schoolOrCompany"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdate('schoolOrCompany', target.value)
          }
          placeholder={schoolOrCompanyPlaceholder}
          value={state.schoolOrCompany}
        />
      </Grid>
      <Grid gridGap={6} gridTemplateColumns="1fr 1fr" mt="small">
        <Flex flexDirection="column">
          <Label>Från</Label>
          <DatePicker
            onChange={value => handleUpdate('start', value)}
            placeholder="Startdatum"
            value={state.start}
          />
        </Flex>
        <Flex flexDirection="column">
          <Label>Till</Label>
          <DatePicker
            onChange={value => handleUpdate('end', value)}
            placeholder="Slutdatum"
            value={state.end}
          />
        </Flex>
      </Grid>

      <Button
        mt={35}
        onClick={handleSubmit}
        type="submit"
        variant="inActive"
        width={1}
      >
        Lägg till
      </Button>
    </>
  )
}

export default AddAndEditForm
