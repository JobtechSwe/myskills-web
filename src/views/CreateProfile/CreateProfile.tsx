import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Button from '../../components/Button'

const CreateProfile: React.FC<RouteComponentProps> = ({ children }) => (
  <Grid justifyContent="center">
    {children}
    <Button mt={32} variant="secondary">
      Spara i MyData
    </Button>
  </Grid>
)

export default CreateProfile
