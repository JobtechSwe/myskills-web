import React from 'react'
import styled from '@emotion/styled'
import { buttonStyle } from 'styled-system'

const Btn = styled.button`
  border: 0;
  color: white;
  font-size: 20px;
  white-space: nowrap;
  text-decoration: none;
  padding: 10px 20px;
  cursor: pointer;
  ${buttonStyle}
`

interface Props {
  text: string
  variant?: string
}

const Button: React.FC<Props> = ({ text, variant }) => (
  <Btn variant={variant}>{text}</Btn>
)

export default Button
