import React, { useState } from 'react'
import Grid from './Grid'
import Flex from './Flex'
import Input from './Input'
import { Label } from './Typography'
import Button from './Button'
import DatePicker from './DatePicker'
import close from '../assets/icons/close.svg'
import styled from '@emotion/styled'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 6px;
`
interface AddAndEditFormProps {
  abortEdit?: () => void
  edit?: boolean
  editItem?: any
  titlePlaceholder: string
  schoolOrCompanyPlaceholder: string
  label: string
  onSubmit: (payload: any) => void
  handleDelete?: (payload: any) => void
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
      <Grid gridGap={6}>
        <Header>
          <Label>{label}</Label>
          {edit && (
            <button onClick={abortEdit}>
              <img alt="close" src={close} />
            </button>
          )}
        </Header>
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
