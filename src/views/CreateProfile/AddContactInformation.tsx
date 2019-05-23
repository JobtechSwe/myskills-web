import { Layout, Navigation } from 'components/Layout/Registration'
import { Profile } from 'generated/myskills.d'
import { RouteComponentProps, navigate } from '@reach/router'
import ContactInformation from 'views/partials/ContactInformation'
import React from 'react'

const AddContactInformation: React.FC<RouteComponentProps> = () => {
  const handleSubmit = (_profile: Profile) => {
    navigate('/skapa-cv/spara-cv')
  }

  return (
    <Layout>
      <Navigation section="Kontakt" step={6} />
      <ContactInformation buttonText="Fortsätt" onSubmit={handleSubmit} />
    </Layout>
  )
}

export default AddContactInformation
