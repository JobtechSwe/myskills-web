import React from 'react'
import styled from '@emotion/styled'
import { theme } from '../../theme'
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

export const H1 = styled.h1`
  ${color}
  ${fontSize}
  ${space}
`
export const H2 = styled.h2`
  ${color}
  ${fontSize}
  ${space}
`
export const H3 = styled.h3`
  ${color}
  ${fontSize}
  ${space}
`

export const Paragraph = styled.p`
  ${color}
  ${fontSize}
  ${space}
`

type HeadingProps = ColorProps & FontSizeProps & SpaceProps

const common: HeadingProps = {
  color: theme.colors.white,
  mt: theme.space.none,
}

H1.defaultProps = {
  ...common,
  fontSize: ['small', 'medium', 'large'],
}

H2.defaultProps = {
  ...common,
  fontSize: ['small', 'medium'],
}

H3.defaultProps = {
  ...common,
  fontSize: 'small',
}

Paragraph.defaultProps = {
  fontSize: 'small',
}
