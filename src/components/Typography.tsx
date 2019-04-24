import React from 'react'
import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  space,
  SpaceProps,
} from 'styled-system'

type TypographyProps = ColorProps &
  FontFamilyProps &
  FontSizeProps &
  ColorProps &
  SpaceProps

type HeadingProps = React.HTMLProps<HTMLHeadingElement> & TypographyProps
type ParagraphProps = React.HTMLProps<HTMLParagraphElement> & TypographyProps

export const H1 = styled.h1<HeadingProps & FontWeightProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${space}
`

export const H2 = styled.h2<HeadingProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

export const H3 = styled.h3<HeadingProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

export const Paragraph = styled.p<ParagraphProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`

const common: HeadingProps = {
  color: 'persianBlue',
  fontFamily: 'default',
  mt: 'none',
}

H1.defaultProps = {
  ...common,
  fontSize: ['small', 'medium', 'large'],
  fontWeight: 600,
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
