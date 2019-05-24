import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import AddAndEditForm from 'components/AddAndEditForm'
import AddedEducations from 'components/AddedEducations'
import IllustrationHeader from 'components/IllustrationHeader'
import bookIllustration from 'assets/illustrations/book.svg'
import RegistrationLayout from 'components/Layout/RegistrationLayout'
import { v4 } from 'uuid'
import { Entry } from 'components/Timeline/index'

export type EducationInput = {
  id?: String
  programme: String
  degree?: String
  school: String
  start: String
  end?: String
}

export const ADD_EDUCATION_CLIENT = gql`
  mutation addEducationClient($education: EducationInput!) {
    addEducationClient(education: $education) @client {
      id
      programme
      degree
      school
      start
      end
    }
  }
`

const REMOVE_EDUCATION_CLIENT = gql`
  mutation removeEducationClient($education: EducationInput!) {
    removeEducationClient(education: $education) @client {
      id
    }
  }
`

const UPDATE_EDUCATION_CLIENT = gql`
  mutation updateEducationClient($education: EducationInput!) {
    updateEducationClient(education: $education) @client {
      id
    }
  }
`

const AddEducation: React.FC<RouteComponentProps> = () => {
  const initialEditEntry = {
    id: '',
    title: '',
    degree: '',
    schoolOrCompany: '',
    start: '',
    end: '',
  } as Entry

  const addEducationClient = useMutation(ADD_EDUCATION_CLIENT)
  const removeEducationClient = useMutation(REMOVE_EDUCATION_CLIENT)
  const updateEducationClient = useMutation(UPDATE_EDUCATION_CLIENT)

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
    removeEducationClient({
      variables: {
        education: {
          id: entry.id,
          programme: entry.title,
          school: entry.schoolOrCompany,
          start: entry.start,
          end: entry.end,
        },
      },
    })

    toggleEdit(false)
  }

  const handleSubmit = ({
    id,
    title,
    start,
    end,
    schoolOrCompany,
    degree,
  }: Entry) => {
    const education: EducationInput = {
      end,
      programme: title,
      degree,
      school: schoolOrCompany,
      start,
    }

    if (edit) {
      updateEducationClient({
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

    addEducationClient({
      variables: {
        education: {
          ...education,
          id: v4(),
        },
      },
    })
  }

  return (
    <RegistrationLayout headerText="UTBILDNING" nextPath="beskriv-dig" step={4}>
      <IllustrationHeader
        imageAltTag="Bok-illustration"
        imageFirst={false}
        imageSource={bookIllustration}
        title="Vad har du för utbildning?"
      />
      <AddedEducations editingEntry={editEntry.id} handleEdit={handleEdit} />
      {edit && (
        <AddAndEditForm
          abortEdit={abortEdit}
          edit={true}
          editItem={editEntry}
          handleDelete={handleDelete}
          isEducation={true}
          label="Uppdatera utbildning"
          onSubmit={handleSubmit}
          schoolOrCompanyPlaceholder="Namn på skola..."
          titlePlaceholder="Namn på utbildning..."
        />
      )}
      {!edit && (
        <AddAndEditForm
          degreePlaceholder="Ev. examen..."
          isEducation={true}
          label="Lägg till utbildning"
          onSubmit={handleSubmit}
          schoolOrCompanyPlaceholder="Namn på skola..."
          titlePlaceholder="Namn på utbildning..."
        />
      )}
    </RegistrationLayout>
  )
}

export default AddEducation
