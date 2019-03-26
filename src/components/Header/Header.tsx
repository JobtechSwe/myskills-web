import React, { useContext } from 'react'
import { Context } from '../../Context'

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
  color: dodgerblue;
  transform: ${({ isActive }: any) => (isActive ? 'scale(1)' : 'scale(0.5)')};
  transition: transform 300ms ease;
`

const Header: React.FC = () => {
  const { state, dispatch } = useContext(Context)

  return (
    <Container>
      <Logo isActive={state.logoActive}>MySkills</Logo>
    </Container>
  )
}

export default Header
