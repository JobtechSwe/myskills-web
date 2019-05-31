import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import React from 'react'

const UploadImage: React.FC<RouteComponentProps> = () => {
  const _handleSubmit = () => {
    navigate('/skapa-cv/kontakt')
  }

  return (
    <Layout>
      <Navigation section="Bild" step={5} />
    </Layout>
  )
}

export default UploadImage
