import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'

const CreateProfile: React.FC<RouteComponentProps> = ({ children }) => {
  return <Grid justifyContent="center">{children}</Grid>
}

export default CreateProfile
