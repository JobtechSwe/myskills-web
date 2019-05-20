import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { RouteComponentProps, Link } from '@reach/router'
import Grid from '../../components/Grid'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AddedEducations from '../../components/AddedEducations'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

export const ADD_EDUCATION_CLIENT = gql`
  mutation addEducationClient($education: EducationInput!) {
    addEducationClient(education: $education) @client {
      programme
      school
      start
      end
    }
  }
`

export const ADD_EDUCATION_API = gql`
  mutation addEducationApi($education: EducationInput!) {
    addEducation(education: $education) {
      programme
      end
      school
      start
    }
  }
`

const AddEducation: React.FC<RouteComponentProps> = () => {
  const initialState = {
    programme: '',
    school: '',
    start: '',
    end: '',
  }
  const addEducationClient = useMutation(ADD_EDUCATION_CLIENT)
  const [education, addEducation] = useState(initialState)

  const handleUpdate = (name: string, value: string) => {
    const updated = {
      ...education,
      [name]: value,
    }

    addEducation(updated)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    addEducationClient({
      variables: {
        education,
      },
    })

    addEducation(initialState)
  }

  return (
    <RegistrationLayout headerText="UTBILDNING" nextPath="beskriv-dig" step={4}>
      <form onSubmit={handleSubmit}>
        <Grid>
          <AddedEducations />

          <Input
            name="programme"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('programme', target.value)
            }
            placeholder="Program"
            type="text"
            value={education.programme}
          />

          <Input
            name="school"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('school', target.value)
            }
            placeholder="Skola"
            type="text"
            value={education.school}
          />

          <Input
            name="start"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('start', target.value)
            }
            placeholder="Från"
            type="date"
            value={education.start}
          />

          <Input
            name="end"
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
              handleUpdate('end', target.value)
            }
            placeholder="Till"
            type="date"
            value={education.end}
          />

          <Button type="submit">Lägg till</Button>
        </Grid>
      </form>
    </RegistrationLayout>
  )
}

export default AddEducation
