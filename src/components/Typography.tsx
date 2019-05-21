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
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system'

type TypographyProps = ColorProps &
  FontFamilyProps &
  FontSizeProps &
  FontWeightProps &
  ColorProps &
  LineHeightProps &
  TextAlignProps &
  SpaceProps

type HeadingProps = React.HTMLProps<HTMLHeadingElement> & TypographyProps
type ParagraphProps = React.HTMLProps<HTMLParagraphElement> & TypographyProps
type LabelProps = React.HTMLProps<HTMLLabelElement> & TypographyProps

export const H1 = styled.h1<HeadingProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${textAlign}
  ${space}
  ${textAlign}
`

export const H2 = styled.h2<HeadingProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${textAlign}
  ${space}
  ${textAlign}
`

export const H3 = styled.h3<HeadingProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${lineHeight}
  ${fontWeight}
  ${textAlign}
  ${space}
  ${textAlign}
`

export const Paragraph = styled.p<ParagraphProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${lineHeight}
  ${fontWeight}
  ${textAlign}
  ${space}
  ${textAlign}
`

export const Label = styled.label<LabelProps & FontWeightProps>`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${space}
  ${textAlign}
`
export const Bold = styled(Paragraph)`
  ${color}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
  ${textAlign}
  ${space}
`

const common: HeadingProps = {
  color: 'black',
  fontFamily: 'default',
  mt: 'none',
  mb: 'large',
}

H1.defaultProps = {
  ...common,
  fontSize: ['large'],
  fontWeight: 600,
}

H2.defaultProps = {
  ...common,
  fontSize: ['medium'],
}

H3.defaultProps = {
  ...common,
  fontSize: 'small',
}

Paragraph.defaultProps = {
  fontFamily: 'default',
  fontSize: 'small',
  lineHeight: '22px',
  mb: 'medium',
  mt: 'small',
}

Bold.defaultProps = {
  fontFamily: 'default',
  fontSize: 'medium',
  fontWeight: 700,
  mt: 0,
  mb: 0,
}

Label.defaultProps = {
  fontFamily: 'default',
  fontWeight: 700,
  fontSize: 'small',
  mb: 6,
  ml: 6,
}
