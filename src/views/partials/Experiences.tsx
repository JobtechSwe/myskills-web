import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { H1 } from 'components/Typography'
import Timeline from 'components/Timeline'

import { Experience } from 'generated/myskills'
import AddAndEditForm from 'components/AddAndEditForm'
import { FooterButton } from 'components/Layout/Registration'

import { Entry } from 'components/Timeline/index'

interface WorkExperienceProps {
  buttonText: string
  experiences: Experience[]
  onSubmit: (experiences: Experience[]) => void
  addExperience: (args: any) => any
  removeExperience: (args: any) => any
  updateExperience: (args: any) => any
}

export const Experiences: React.FC<
  RouteComponentProps & WorkExperienceProps
> = ({
  buttonText,
  onSubmit,
  experiences,
  addExperience,
  removeExperience,
  updateExperience,
}) => {
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

  const handleEdit = (entry: Entry) => {
    setEditEntry(entry)
    toggleEdit(true)
  }

  const abortEdit = () => {
    setEditEntry(initialEditEntry)
    toggleEdit(false)
  }

  const handleDelete = (entry: Entry) => {
    removeExperience({
      variables: {
        id: entry.id,
      },
    })

    toggleEdit(false)
  }

  const handleSubmit = (formState: Entry) => {
    if (edit) {
      updateExperience({
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

    addExperience({
      variables: {
        experience: {
          term: formState.title,
          employer: formState.schoolOrCompany,
          start: formState.start,
          end: formState.end,
        },
      },
    })
  }

  return (
    <>
      <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
      {experiences.length > 0 && (
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
      <FooterButton
        onClick={() => onSubmit(experiences as Experience[])}
        text={buttonText}
      />
    </>
  )
}

export default Experiences
