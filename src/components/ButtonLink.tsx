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
import Button from 'components/Button'

type ButtonLinkProps = FontFamilyProps & FontSizeProps & SpaceProps

const ButtonLink = styled(Button)<ButtonLinkProps>`
  ${fontFamily}
  ${fontSize}
  ${space}
`

ButtonLink.defaultProps = {
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
}

export const OpenInApp: React.FC<{ url: string }> = ({ url }) => (
  <Button as="a" href={url}>
    Öppna i Egendata
  </Button>
)

export default ButtonLink
