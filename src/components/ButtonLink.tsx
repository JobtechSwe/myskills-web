import React from 'react'
import styled from '@emotion/styled'
import {
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

type ButtonLinkProps = FontFamilyProps & FontSizeProps & SpaceProps

const ButtonLink = styled.a<ButtonLinkProps>`
  text-decoration: none;
  color: #000;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: #444;
  }

  ${fontFamily}
  ${fontSize}
  ${space}
`

ButtonLink.defaultProps = {
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
}

export const OpenInApp: React.FC<{ url: string }> = ({ url }) => (
  <ButtonLink href={url}>Öppna i Egendata</ButtonLink>
)

export default ButtonLink
