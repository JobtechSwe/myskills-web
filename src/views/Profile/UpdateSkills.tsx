import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import MatchSkills from 'views/partials/MatchSkills'
import React from 'react'

const AddSkills: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/skapa-cv/erfarenheter')
  }

  return (
    <Layout>
      <Navigation section="Kompetens" step={2} />
      {/* <MatchSkills buttonText="Fortsätt" onSubmit={handleSubmit} /> */}
    </Layout>
  )
}

export default AddSkills
