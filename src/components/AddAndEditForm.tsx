import React, { useState } from 'react'
import Grid from './Grid'
import Flex from './Flex'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'
import DatePicker from './DatePicker'
import close from 'assets/icons/close.svg'

export interface FormState {
  schoolOrCompany: string
  end: string
  start: string
  title: string
}

interface AddAndEditFormProps {
  abortEdit?: () => void
  edit?: boolean
  editItem?: any
  titlePlaceholder: string
  schoolOrCompanyPlaceholder: string
  label: string
  onSubmit: (state: FormState) => void
  handleDelete?: (state: FormState) => void
}

export const AddAndEditForm: React.FC<AddAndEditFormProps> = ({
  abortEdit,
  edit,
  editItem,
  titlePlaceholder,
  schoolOrCompanyPlaceholder,
  label,
  onSubmit,
  handleDelete,
}) => {
  const emptyState = {
    schoolOrCompany: '',
    end: '',
    start: '',
    title: '',
  }
  const initialState = edit ? editItem : emptyState

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

    updateState(emptyState)
  }

  return (
    <>
      <Grid gridGap={6} mb={15}>
        <Flex justifyContent="space-between" mr={6}>
          <Label>{label}</Label>
          {edit && (
            <button onClick={abortEdit}>
              <img alt="close" src={close} />
            </button>
          )}
        </Flex>
        <Input
          data-testid="title"
          name="title"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdate('title', target.value)
          }
          placeholder={titlePlaceholder}
          value={state.title}
        />
        <Input
          data-testid="schoolOrCompany"
          name="schoolOrCompany"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdate('schoolOrCompany', target.value)
          }
          placeholder={schoolOrCompanyPlaceholder}
          value={state.schoolOrCompany}
        />
      </Grid>
      <Grid gridGap={6} gridTemplateColumns="1fr 1fr">
        <Flex flexDirection="column">
          <Label>Från</Label>
          <DatePicker
            dataTestId="startDate"
            onChange={value => handleUpdate('start', value)}
            placeholder="Startdatum"
            value={state.start}
          />
        </Flex>
        <Flex flexDirection="column">
          <Label>Till</Label>
          <DatePicker
            dataTestId="endDate"
            onChange={value => handleUpdate('end', value)}
            placeholder="Slutdatum"
            value={state.end}
          />
        </Flex>
      </Grid>

      {edit ? (
        <Grid gridGap={6} gridTemplateColumns="1fr 1fr" mt="small">
          <Button
            data-testid="deleteButton"
            onClick={() => handleDelete(state)}
            type="submit"
            variant="inActive"
          >
            Radera
          </Button>
          <Button
            data-testid="updateButton"
            onClick={handleSubmit}
            type="submit"
            variant="primary"
          >
            Spara
          </Button>
        </Grid>
      ) : (
        <Button
          data-testid="saveButton"
          mt={30}
          onClick={handleSubmit}
          type="submit"
          variant="inActive"
          width={1}
        >
          Lägg till
        </Button>
      )}
    </>
  )
}

export default AddAndEditForm
