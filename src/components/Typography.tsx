import React from 'react'
import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

export const H1 = styled.h1`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

export const H2 = styled.h2`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

export const H3 = styled.h3`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

export const Paragraph = styled.p`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

type HeadingProps = ColorProps & FontFamilyProps & FontSizeProps & SpaceProps

const common: HeadingProps = {
  color: 'white',
  fontFamily: 'default',
  mt: 'none',
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
  fontFamily: 'default',
  fontSize: 'small',
}
