import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import { Occupation } from 'generated/myskills.d'
import React from 'react'
import Profession from 'views/partials/Profession'

const ChooseProfession: React.FC<RouteComponentProps> = () => {
  const handleSubmit = (_profession: Occupation) => {
    navigate('/skapa-cv/kompetenser')
  }

  return (
    <Layout>
      <Navigation section="Yrke" step={1} />
      <Profession buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default ChooseProfession
