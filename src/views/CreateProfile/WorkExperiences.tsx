import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { H1 } from 'components/Typography'
import gql from 'graphql-tag'
import Timeline from 'components/Timeline'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { GET_EXPERIENCES_CLIENT } from 'graphql/resolvers/mutations/addExperience'
import { Experience } from 'generated/myskills'
import AddAndEditForm from 'components/AddAndEditForm'
import RegistrationLayout from 'components/Layout/RegistrationLayout'
import { v4 } from 'uuid'
import { Entry } from 'components/Timeline/index'
import styled from '@emotion/styled'

const TimelineWrapper = styled.div`
  margin: 25px 0;
`

const AddOrEditFormWrapper = styled.div<{ edit: boolean }>`
  ${({ edit }) =>
    edit &&
    `
    position: absolute;
    bottom: 32px;
    width: calc(100% - 64px);
  `}
`

const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      sourceId
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
      sourceId
    }
  }
`

const UPDATE_EXPERIENCE_CLIENT = gql`
  mutation updateExperienceClient($experience: ExperienceInput!) {
    updateExperienceClient(experience: $experience) @client {
      sourceId
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
          sourceId: entry.id,
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
            sourceId: formState.id,
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
          sourceId: v4(),
          term: formState.title,
          employer: formState.schoolOrCompany,
          start: formState.start,
          end: formState.end,
        },
      },
    })
  }

  return (
    <RegistrationLayout
      headerText="ERFARENHET"
      showNextButton={edit}
      nextPath="utbildning"
      step={3}
    >
      <div>
        <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
        {experiences && (
          <TimelineWrapper>
            <Timeline
              editingEntry={editEntry.id}
              entries={experiences.map((exp: Experience) => ({
                id: exp.sourceId,
                title: exp.term,
                schoolOrCompany: exp.employer,
                start: exp.start,
                end: exp.end,
              }))}
              handleEdit={handleEdit}
            />
          </TimelineWrapper>
        )}
        <AddOrEditFormWrapper edit={edit}>
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
        </AddOrEditFormWrapper>
      </div>
    </RegistrationLayout>
  )
}

export default WorkExperiences
