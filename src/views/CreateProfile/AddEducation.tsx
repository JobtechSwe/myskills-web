import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import { useQuery } from 'react-apollo-hooks'
import { GET_EDUCATIONS_CLIENT } from 'graphql/shared/Queries'
import Education from 'views/partials/Education'
import React from 'react'

const AddEducation: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/skapa-cv/beskriv-dig')
  }

  const {
    data: { educations = [] },
    loading,
  } = useQuery(GET_EDUCATIONS_CLIENT)

  return (
    <Layout>
      <Navigation section="Utbildning" step={4} />
      {loading && <p>Loading...</p>}
      {educations && (
        <Education
          buttonText="Fortsätt"
          educations={educations}
          onSubmit={handleSubmit}
        />
      )}
    </Layout>
  )
}

export default AddEducation
