import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { H1 } from '../../components/Typography'
import gql from 'graphql-tag'
import Timeline from '../../components/Timeline'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { GET_EXPERIENCES_CLIENT } from '../../graphql/resolvers/mutations/addExperience'
import { Experience } from '../../generated/myskills'
import AddAndEditForm from '../../components/AddAndEditForm'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'
import { v4 } from 'uuid'
import { Entry } from '../../components/Timeline/index'

const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      id
      employer
      end
      start
      term
    }
  }
`

const REMOVE_EXPERIENCE_CLIENT = gql`
  mutation removeExperienceClient($experience: ExperienceInput!) {
    removeExperienceClient(experience: $experience) @client {
      id
    }
  }
`

const UPDATE_EXPERIENCE_CLIENT = gql`
  mutation updateExperienceClient($experience: ExperienceInput!) {
    updateExperienceClient(experience: $experience) @client {
      id
    }
  }
`

export const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const initialEditEntry = {
    id: '',
    title: '',
    degree: '',
    schoolOrCompany: '',
    start: '',
    end: '',
  } as Entry

  const [edit, toggleEdit] = useState(false)
  const [editEntry, setEditEntry] = useState(initialEditEntry)

  const addExperienceClient = useMutation(ADD_EXPERIENCE_CLIENT)
  const removeExperienceClient = useMutation(REMOVE_EXPERIENCE_CLIENT)
  const updateExperienceClient = useMutation(UPDATE_EXPERIENCE_CLIENT)
  const {
    data: { experiences },
  } = useQuery(GET_EXPERIENCES_CLIENT)

  const handleEdit = (entry: Entry) => {
    setEditEntry(entry)
    toggleEdit(true)
  }

  const abortEdit = () => {
    setEditEntry(initialEditEntry)
    toggleEdit(false)
  }

  const handleDelete = (entry: Entry) => {
    removeExperienceClient({
      variables: {
        experience: {
          id: entry.id,
          term: entry.title,
          employer: entry.schoolOrCompany,
          start: entry.start,
          end: entry.end,
        },
      },
    })

    toggleEdit(false)
  }

  const handleSubmit = (formState: Entry) => {
    if (edit) {
      updateExperienceClient({
        variables: {
          experience: {
            id: formState.id,
            term: formState.title,
            employer: formState.schoolOrCompany,
            start: formState.start,
            end: formState.end,
          },
        },
      })

      setEditEntry(initialEditEntry)
      return toggleEdit(false)
    }

    addExperienceClient({
      variables: {
        experience: {
          id: v4(),
          term: formState.title,
          employer: formState.schoolOrCompany,
          start: formState.start,
          end: formState.end,
        },
      },
    })
  }

  return (
    <RegistrationLayout headerText="ERFARENHET" nextPath="utbildning" step={3}>
      <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
      {experiences && (
        <Timeline
          editingEntry={editEntry.id}
          entries={experiences.map((exp: Experience) => ({
            id: exp.id,
            title: exp.term,
            schoolOrCompany: exp.employer,
            start: exp.start,
            end: exp.end,
          }))}
          handleEdit={handleEdit}
        />
      )}
      {edit && (
        <AddAndEditForm
          abortEdit={abortEdit}
          edit={true}
          editItem={editEntry}
          handleDelete={handleDelete}
          label="Uppdatera erfarenhet"
          onSubmit={handleSubmit}
          schoolOrCompanyPlaceholder="Arbetsgivare..."
          titlePlaceholder="Namn på tjänst..."
        />
      )}
      {!edit && (
        <AddAndEditForm
          label="Lägg till erfarenhet"
          onSubmit={handleSubmit}
          schoolOrCompanyPlaceholder="Arbetsgivare..."
          titlePlaceholder="Namn på tjänst..."
        />
      )}
    </RegistrationLayout>
  )
}

export default WorkExperiences
