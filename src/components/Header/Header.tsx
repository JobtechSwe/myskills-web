import React from 'react'
import styled from '@emotion/styled'

const Container = styled.header`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Logo = styled.h1`
  font-size: 48px;
  font-family: 'Arial';
  font-weight: bold;
  color: white;
`

const Header: React.FC = () => {
  return (
    <Container>
      <Logo>MySkills</Logo>
    </Container>
  )
}

export default Header
