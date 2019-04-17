import React from 'react'
import { H1 } from './Typography'
import Grid from './Grid'

interface HeaderProps {
  title: String
}

const Header: React.FC<HeaderProps> = ({ title = '' }) => {
  return (
    <Grid justifyContent="center" p={32}>
      <H1>{title}</H1>
    </Grid>
  )
}

export default Header
