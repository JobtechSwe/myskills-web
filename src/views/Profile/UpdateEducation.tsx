import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import {
  MutationAddEducationArgs,
  Mutation,
  MutationRemoveEducationArgs,
  GetEducationsQuery,
  MutationEditEducationArgs,
} from 'generated/myskills'
import { GET_EDUCATIONS } from 'graphql/shared/Queries'
import Education from 'views/partials/Education'
import React from 'react'
import {
  ADD_EDUCATION,
  REMOVE_EDUCATION,
  EDIT_EDUCATION,
} from 'graphql/shared/Mutations'

const UpdateEducation: React.FC<RouteComponentProps> = () => {
  const {
    data: { educations = [] },
    loading,
  } = useQuery<GetEducationsQuery>(GET_EDUCATIONS, {
    fetchPolicy: 'network-only',
  })

  const addEducation = useMutation<
    Mutation['addEducation'],
    MutationAddEducationArgs
  >(ADD_EDUCATION, {
    refetchQueries: [{ query: GET_EDUCATIONS }],
  })

  const removeEducation = useMutation<{}, MutationRemoveEducationArgs>(
    REMOVE_EDUCATION,
    {
      refetchQueries: [{ query: GET_EDUCATIONS }],
    }
  )

  const updateEducation = useMutation<
    Mutation['editEducation'],
    MutationEditEducationArgs
  >(EDIT_EDUCATION, {
    refetchQueries: [{ query: GET_EDUCATIONS }],
  })

  const handleSubmit = () => navigate('/profil')

  return (
    <Layout>
      <Navigation section="Utbildning" />
      {loading && <p>Loading...</p>}
      {educations && (
        <Education
          addEducation={addEducation}
          buttonText="Spara"
          educations={educations}
          onSubmit={handleSubmit}
          removeEducation={removeEducation}
          updateEducation={updateEducation}
        />
      )}
    </Layout>
  )
}

export default UpdateEducation
