import React from 'react'
import styled from '@emotion/styled'
import { Link as RouterLink } from '@reach/router'
import {
  color,
  ColorProps,
  fontWeight,
  FontWeightProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from 'styled-system'

type LinkProps = React.HTMLProps<HTMLAnchorElement> &
  ColorProps &
  FontWeightProps &
  SpaceProps &
  WidthProps

const StyledLink = styled.a<LinkProps>`
  font-family: ${({ theme }) => theme.fonts.default};

  ${color}
  ${fontWeight}
  ${space}
  ${width}
`

StyledLink.defaultProps = {
  color: 'persianBlue',
  fontWeight: 500,
}

export const Link = styled(StyledLink)<LinkProps>``

Link.defaultProps = {
  target: '_blank',
  rel: 'noopener',
}

export const InternalLink = Link.withComponent(RouterLink)

InternalLink.defaultProps = {
  color: 'persianBlue',
  fontWeight: 500,
}
