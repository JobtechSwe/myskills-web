import React, { useState } from 'react'
import { MutationHookOptions } from 'react-apollo-hooks'
import { RouteComponentProps } from '@reach/router'
import AddAndEditForm from 'components/AddAndEditForm'
import AddedEducations from 'components/AddedEducations'
import IllustrationHeader from 'components/IllustrationHeader'
import bookIllustration from 'assets/illustrations/book.svg'
import { FooterButton } from 'components/Layout/Registration'
import { Entry } from 'components/Timeline/index'
import {
  Education as EducationType,
  MutationRemoveEducationArgs,
  EducationInput,
  MutationAddEducationArgs,
  MutationEditEducationArgs,
} from 'generated/myskills'

interface EducationProps {
  onSubmit: (educations: EducationType[]) => void
  buttonText: string
  educations: EducationType[]
  addEducation: (
    args: MutationHookOptions<{}, MutationAddEducationArgs>
  ) => void
  removeEducation: (
    args: MutationHookOptions<{}, MutationRemoveEducationArgs>
  ) => any
  updateEducation: (
    args: MutationHookOptions<{}, MutationEditEducationArgs>
  ) => any
}

const Education: React.FC<RouteComponentProps & EducationProps> = ({
  educations,
  onSubmit,
  buttonText,
  addEducation,
  removeEducation,
  updateEducation,
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
    removeEducation({
      variables: {
        id: entry.id,
      },
    })

    toggleEdit(false)
  }

  const handleSubmit = ({ id, title, start, end, schoolOrCompany }: Entry) => {
    const education: EducationInput = {
      end,
      programme: title,
      school: schoolOrCompany,
      start,
    }

    if (edit) {
      updateEducation({
        variables: {
          education: {
            ...education,
            id,
          },
        },
      })

      setEditEntry(initialEditEntry)
      return toggleEdit(false)
    }

    addEducation({
      variables: {
        education: {
          ...education,
        },
      },
    })
  }

  return (
    <>
      <IllustrationHeader
        imageAltTag="Bok-illustration"
        imageFirst={false}
        imageSource={bookIllustration}
        title="Vad har du för utbildning?"
      />
      {educations && (
        <AddedEducations
          editingEntry={editEntry.id}
          educations={educations}
          handleEdit={handleEdit}
        />
      )}
      {edit && (
        <AddAndEditForm
          abortEdit={abortEdit}
          edit={true}
          editItem={editEntry}
          handleDelete={handleDelete}
          label="Uppdatera utbildning"
          onSubmit={handleSubmit}
          schoolOrCompanyPlaceholder="Namn på utbildning..."
          titlePlaceholder="Namn på skola..."
        />
      )}
      {!edit && (
        <AddAndEditForm
          label="Lägg till utbildning"
          onSubmit={handleSubmit}
          schoolOrCompanyPlaceholder="Namn på utbildning..."
          titlePlaceholder="Namn på skola..."
        />
      )}
      <FooterButton onClick={() => onSubmit(educations)} text={buttonText} />
    </>
  )
}

export default Education
