import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import React from 'react'
import Traits from 'views/partials/Traits'

const AddTraits: React.FC<RouteComponentProps> = () => {
  const handleSubmit = (_traits: string[]) => {
    navigate('/skapa-cv/profilbild')
  }

  return (
    <Layout>
      <Navigation section="Person" step={5} />
      <Traits buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default AddTraits
