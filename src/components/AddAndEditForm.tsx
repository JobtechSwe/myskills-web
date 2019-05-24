import React, { useState } from 'react'
import Grid from './Grid'
import Flex from './Flex'
import Input from './Input'
import Select from './Select'
import { Label } from './Typography'
import Button from './Button'
import DatePicker from './DatePicker'
import close from 'assets/icons/close.svg'

export interface FormState {
  schoolOrCompany: string
  end: string
  start: string
  title: string
  degree?: string
}

interface AddAndEditFormProps {
  abortEdit?: () => void
  degreePlaceholder?: string
  edit?: boolean
  editItem?: any
  handleDelete?: (state: FormState) => void
  label: string
  onSubmit: (state: FormState) => void
  schoolOrCompanyPlaceholder: string
  titlePlaceholder: string
  isEducation?: boolean
}

export const AddAndEditForm: React.FC<AddAndEditFormProps> = ({
  abortEdit,
  degreePlaceholder,
  edit,
  editItem,
  handleDelete,
  titlePlaceholder,
  schoolOrCompanyPlaceholder,
  label,
  onSubmit,
  isEducation,
}) => {
  const emptyState = {
    schoolOrCompany: '',
    end: '',
    start: '',
    title: '',
    degree: '',
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
      <Grid gridGap={6}>
        <Flex justifyContent="space-between" mr={6}>
          <Label>{label}</Label>
          {edit && (
            <button onClick={abortEdit}>
              <img alt="close" src={close} />
            </button>
          )}
        </Flex>
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
        {isEducation ? (
          <Select
            name="degree"
            onChange={({ target }: React.ChangeEvent<HTMLSelectElement>) =>
              handleUpdate('degree', target.value)
            }
            value={state.degree}
          >
            <option value="">{degreePlaceholder}</option>
            <option>Diplomerad</option>
            <option>Yrkeshögskoleexamen</option>
            <option>Kvalificerad yrkeshögskoleexamen</option>
            <option>Kandidat</option>
            <option>Magister</option>
            <option>Master</option>
            <option>Doktorand</option>
          </Select>
        ) : null}
      </Grid>
      <Grid gridGap={6} gridTemplateColumns="1fr 1fr" mt="small">
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
            onClick={() => handleDelete(state)}
            type="submit"
            variant="inActive"
          >
            Radera
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="primary">
            Spara
          </Button>
        </Grid>
      ) : (
        <Button
          mt={35}
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
