import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

interface OpenInAppProps {
  children: ReactNode
  url: string
}

type ButtonLinkProps = FontFamilyProps & FontSizeProps & SpaceProps

const ButtonLink = styled.a<ButtonLinkProps>`
  align-items: center;
  background: ${({ theme }) => theme.colors.persianBlue};
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  text-decoration: none;

  ${fontFamily}
  ${fontSize}
  ${space}
`

ButtonLink.defaultProps = {
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
}

export const OpenInApp: React.FC<OpenInAppProps> = ({ children, url }) => (
  <ButtonLink fontSize="medium" href={url} pb={20} pl={30} pr={30} pt={20}>
    {children}
  </ButtonLink>
)

export default ButtonLink
