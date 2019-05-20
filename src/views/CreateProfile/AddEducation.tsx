import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import AddAndEditForm, { FormState } from '../../components/AddAndEditForm'
import AddedEducations from '../../components/AddedEducations'
import IllustrationHeader from '../../components/IllustrationHeader'
import bookIllustration from '../../assets/illustrations/book.svg'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'
import { EducationInput } from '../../generated/myskills.d'

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
  const addEducationClient = useMutation(ADD_EDUCATION_CLIENT)

  const handleSubmit = ({ title, start, end, schoolOrCompany }: FormState) => {
    const education: EducationInput = {
      end,
      programme: title,
      school: schoolOrCompany,
      start,
    }

    addEducationClient({
      variables: {
        education,
      },
    })
  }

  return (
    <RegistrationLayout headerText="UTBILDNING" nextPath="beskriv-dig" step={4}>
      <IllustrationHeader
        imageSource={bookIllustration}
        imageAltTag="Bok-illustration"
        imageFirst={false}
        title="Vad har du för utbildning?"
      />
      <AddedEducations />
      <AddAndEditForm
        label="Lägg till utbildning"
        onSubmit={handleSubmit}
        schoolOrCompanyPlaceholder="Namn på utbildning..."
        titlePlaceholder="Namn på skola..."
      />
    </RegistrationLayout>
  )
}

export default AddEducation
