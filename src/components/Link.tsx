import React from 'react'
import styled from '@emotion/styled'
import { Link as RouterLink } from '@reach/router'
import {
  color,
  ColorProps,
  fontWeight,
  FontWeightProps,
  style,
  space,
  SpaceProps,
  width,
  WidthProps,
} from 'styled-system'

interface StyleProps {
  textDecoration?: String
  to?: String
}

type LinkProps = React.HTMLProps<HTMLAnchorElement> &
  ColorProps &
  FontWeightProps &
  SpaceProps &
  StyleProps &
  WidthProps

const textDecoration = style({
  prop: 'textDecoration',
  cssProperty: 'textDecoration',
})

const StyledLink = styled.a<LinkProps>`
  font-family: ${({ theme }) => theme.fonts.default};

  ${color}
  ${fontWeight}
  ${space}
  ${textDecoration}
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
