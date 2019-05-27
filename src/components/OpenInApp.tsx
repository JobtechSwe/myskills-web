import React from 'react'
import Button from 'components/Button'

const OpenInApp: React.FC<{ url: string }> = ({ url }) => (
  <Button as="a" href={url}>
    Öppna i Egendata
  </Button>
)

export default OpenInApp
