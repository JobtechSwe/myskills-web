import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import React from 'react'
import Traits from 'views/partials/Traits'

const AddTraits: React.FC<RouteComponentProps> = ({ location }) => {
  const handleSubmit = () => {
    navigate('/skapa-cv/spara-cv')
  }

  return (
    <Layout>
      <Navigation section="Person" step={5} />
      <Traits
        buttonText="Fortsätt"
        location={location}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}

export default AddTraits
