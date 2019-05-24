import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { Education as EducationType } from 'generated/myskills'
import { GET_EDUCATIONS } from 'graphql/shared/Queries'
import { ADD_EDUCATION, REMOVE_EDUCATION } from 'graphql/shared/Mutations'
import Education from 'views/partials/Education'
import React from 'react'

const AddEducation: React.FC<RouteComponentProps> = () => {
  const {
    data: { educations = [] },
    loading,
  } = useQuery(GET_EDUCATIONS)

  const handleSubmit = (updatedEducations: EducationType[]) => {
    /* setEducations(updatedEducations) */


    navigate('/profil')
  }

  return (
    <Layout>
      <Navigation section="Utbildning" />
      {loading && <p>Loading...</p>}
      {educations && (
        <Education
          educations={educations}
          buttonText="Spara"
          onSubmit={handleSubmit}
        />
      )}
    </Layout>
  )
}

export default AddEducation
