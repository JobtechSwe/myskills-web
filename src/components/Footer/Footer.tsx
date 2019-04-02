import React from 'react'
import styled from '@emotion/styled'

const Container = styled.footer`
  background-color: white;
  padding: 30px 0;
  text-align: center;
  margin-top: 50px;
`

const Footer: React.FC = () => {
  return (
    <Container>
      <p>This is footer</p>
    </Container>
  )
}

export default Footer
