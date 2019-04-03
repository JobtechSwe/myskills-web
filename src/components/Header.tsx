import React from 'react'
import { H1 } from './Typography'

import styled from '@emotion/styled'

const Container = styled.header`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Logo = styled(H1)``

const Header: React.FC = () => {
  return (
    <Container>
      <Logo>MySkills</Logo>
    </Container>
  )
}

export default Header
