import React, { useContext } from 'react'
import { Context } from '../ContextProvider/ContextProvider'
import { H1 } from '../Typography/Typography'

import styled from '@emotion/styled'

const Container = styled.header`
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Logo = styled(H1)`
  transform: ${({ isActive }: any) => (isActive ? 'scale(1)' : 'scale(0.5)')};
  transition: transform 300ms ease;
`

const Header: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <Container>
      <Logo isActive={state.logoActive}>MySkills</Logo>
    </Container>
  )
}

export default Header
