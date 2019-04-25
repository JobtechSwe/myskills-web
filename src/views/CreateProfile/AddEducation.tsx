import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType, TaxonomyDefaultResult } from '../../generated/myskills.d'
import { GET_TAXONOMY } from '../../graphql/shared/Queries'
import { RouteComponentProps } from '@reach/router'
import { Paragraph } from '../../components/Typography'
import List from '../../components/List'
import Grid from '../../components/Grid'
import Input from '../../components/Input'
import Button from '../../components/Button'

export const ADD_EDUCATION_CLIENT = gql`
  mutation addEducationClient($education: EducationInput!) {
    addEducationClient(education: $education) @client {
      education
      end
      school
      start
    }
  }
`

export const ADD_EDUCATION_API = gql`
  mutation addEducationApi($education: EducationInput!) {
    addEducation(education: $education) {
      education
      end
      school
      start
    }
  }
`

type EducationSelectAction = {
  type: 'FIELD' | 'LEVEL' | 'NAME'
  payload: string
}

type EducationSelectState = {
  field?: string
  level?: string
  name?: string
}

const educationSelectReducer = (
  state: EducationSelectState,
  action: EducationSelectAction
) => {
  switch (action.type) {
    case 'FIELD':
      return { ...state, field: action.payload }
    case 'LEVEL':
      return { ...state, level: action.payload }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

const EducationSelect = ({
  fields,
  levels,
}: {
  fields: TaxonomyDefaultResult[]
  levels: TaxonomyDefaultResult[]
}) => {
  const [state, dispatch] = React.useReducer(educationSelectReducer, {
    field: undefined,
    level: undefined,
    name: undefined,
  })

  const { field, level, name } = state

  return (
    <>
      {!field && !level && !name && <Paragraph>Fyll i inriktning</Paragraph>}

      {field && <Paragraph>Fyll i nivå</Paragraph>}

      {field && level && <Paragraph>Fyll i namn</Paragraph>}

      {field && level && name && <Paragraph>Alla fält ifyllda</Paragraph>}
    </>
  )
}

const AddEducation: React.FC<RouteComponentProps> = () => {
  const addEducationClient = useMutation(ADD_EDUCATION_CLIENT)
  const [education, addEducation] = useState({
    education: '',
    school: '',
    start: '',
    end: '',
  })

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Input
          name="education"
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdate('education', target.value)
          }
          placeholder="Utbildning"
          type="text"
          value={education.education}
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
  )
}

export default AddEducation
