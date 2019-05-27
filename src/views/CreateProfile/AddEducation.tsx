import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_EDUCATIONS_CLIENT } from 'graphql/shared/Queries'
import Education from 'views/partials/Education'
import React from 'react'
import gql from 'graphql-tag'
import {
  Mutation,
  MutationAddEducationArgs,
  MutationRemoveEducationArgs,
  GetEducationsQuery,
} from 'generated/myskills'

export const ADD_EDUCATION_CLIENT = gql`
  mutation addEducationClient($education: EducationInput!) {
    addEducationClient(education: $education) @client {
      id
      programme
      school
      start
      end
    }
  }
`

const REMOVE_EDUCATION_CLIENT = gql`
  mutation removeEducationClient($id: String!) {
    removeEducationClient(id: $id) @client
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
  const handleSubmit = () => {
    navigate('/skapa-cv/beskriv-dig')
  }

  const addEducation = useMutation<
    Mutation['addEducation'],
    MutationAddEducationArgs
  >(ADD_EDUCATION_CLIENT)

  const removeEducation = useMutation<
    Mutation['removeEducation'],
    MutationRemoveEducationArgs
  >(REMOVE_EDUCATION_CLIENT)

  const updateEducation = useMutation<{}, any>(UPDATE_EDUCATION_CLIENT)

  const {
    data: { educations = [] },
    loading,
  } = useQuery<GetEducationsQuery>(GET_EDUCATIONS_CLIENT)

  return (
    <Layout>
      <Navigation section="Utbildning" step={4} />
      {loading && <p>Loading...</p>}
      {educations && (
        <Education
          addEducation={addEducation}
          buttonText="Fortsätt"
          educations={educations}
          onSubmit={handleSubmit}
          removeEducation={removeEducation}
          updateEducation={updateEducation}
        />
      )}
    </Layout>
  )
}

export default AddEducation
