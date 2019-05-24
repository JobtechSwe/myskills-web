import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Experiences from 'views/partials/Experiences'
import { Layout, Navigation } from 'components/Layout/Registration'
import { Experience } from 'generated/myskills.d'

const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const handleSubmit = (_experiences: Experience[]) => {
    navigate('/skapa-cv/utbildning')
  }

  return (
    <Layout>
      <Navigation section="ERFARENHET" step={3} />
      <Experiences buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default WorkExperiences
