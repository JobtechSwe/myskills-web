import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import React from 'react'
import OccupationExperience from 'views/partials/OccupationExperience'

const PreviousOccupationExperience: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/skapa-cv/erfarenheter/tidigare-erfarenheter')
  }

  return (
    <Layout>
      <Navigation section="Erfarenhet" step={3} />
      <OccupationExperience buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default PreviousOccupationExperience
