import React from 'react'
import styled from '@emotion/styled'
import infoIcon from '../assets/images/info.svg'

const Wrapper = styled.div`
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  padding: 15px;
  margin-top: auto;
`

const Img = styled.img`
  margin-right: 10px;
`

const Info: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Img alt="info icon" src={infoIcon} />
      {children}
    </Wrapper>
  )
}

export default Info
