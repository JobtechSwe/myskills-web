import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import WhoAmI from 'views/partials/WhoAmI'
import { Layout, Navigation } from 'components/Layout/Registration'
import { OntologyTextParseResponse } from 'generated/myskills.d'

const AddWhoAmI: React.FC<RouteComponentProps> = () => {
  const handleSubmit = (traits: OntologyTextParseResponse[]) => {
    navigate('/skapa-cv/egenskaper', { state: { traits } })
  }

  return (
    <Layout>
      <Navigation section="Person" step={5} />
      <WhoAmI buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default AddWhoAmI
