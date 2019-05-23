import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import Education from 'views/partials/Education'
import React from 'react'

const AddEducation: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/skapa-cv/beskriv-dig')
  }

  return (
    <Layout>
      <Navigation section="Utbildning" step={4} />
      <Education buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default AddEducation
