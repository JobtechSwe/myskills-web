import React from 'react'
import { H1 } from './Typography'
import { InternalLink } from './Link'
import Grid from './Grid'

const Header: React.FC = () => {
  return (
    <Grid justifyContent="center" p={32}>
      <H1>
        <InternalLink to="/">MySkills</InternalLink>
      </H1>
    </Grid>
  )
}

export default Header
