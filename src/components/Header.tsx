import React from 'react'
import { H1 } from './Typography'
import { Grid } from './Grid'

import styled from '@emotion/styled'

const Header: React.FC = () => {
  return (
    <Grid justifyContent="center" p={32}>
      <H1>MySkills</H1>
    </Grid>
  )
}

export default Header
