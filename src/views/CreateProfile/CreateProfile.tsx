import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Button from '../../components/Button'
import { InternalLink } from '../../components/Link'

const CreateProfile: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <Grid justifyContent="center">
      <InternalLink to="/skapa-cv/erfarenhet">Erfarenhet</InternalLink>
      <InternalLink to="/skapa-cv/utbildning">Utbildning</InternalLink>
      {children}
    </Grid>
  )
}

export default CreateProfile
