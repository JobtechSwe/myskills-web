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
  const [edit, toggleEdit] = useState(false)
  const [entry, setEntry] = useState({
    id: '',
    title: '',
    degree: '',
    schoolOrCompany: '',
    start: '',
    end: '',
  })
  const addExperienceClient = useMutation(ADD_EXPERIENCE_CLIENT)
  const removeExperienceClient = useMutation(REMOVE_EXPERIENCE_CLIENT)
  const updateExperienceClient = useMutation(UPDATE_EXPERIENCE_CLIENT)
  const {
    data: { experiences },
  } = useQuery(GET_EXPERIENCES_CLIENT)

  const handleEdit = (data: any) => {
    setEntry(data)
    toggleEdit(true)
  }

  const handleDelete = (entry: any) => {
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

  const handleSubmit = (formState: any) => {
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
      <Timeline
        handleEdit={handleEdit}
        entries={experiences.map((exp: Experience) => ({
          id: exp.id,
          title: exp.term,
          schoolOrCompany: exp.employer,
          start: exp.start,
          end: exp.end,
        }))}
      />
      {edit && (
        <AddAndEditForm
          abortEdit={() => toggleEdit(false)}
          edit={true}
          editItem={entry}
          label="Uppdatera erfarenhet"
          handleDelete={handleDelete}
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
