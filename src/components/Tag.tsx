import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  fontWeight,
  FontWeightProps,
  opacity,
  OpacityProps,
  space,
  SpaceProps,
  background,
  BackgroundProps,
  borderRadius,
  BorderRadiusProps,
  variant,
  style,
} from 'styled-system'

const tagStyle = variant({
  key: 'tags',
})

type VariantProps = {
  variant?: 'default' | 'active'
}

const cursorStyle = style({
  prop: 'cursor',
  cssProperty: 'cursor',
})

type CursorProps = {
  cursor?: 'pointer'
}

type TagProps = React.HTMLProps<HTMLElement> &
  ColorProps &
  CursorProps &
  FontWeightProps &
  OpacityProps &
  SpaceProps &
  BackgroundProps &
  BorderRadiusProps &
  VariantProps

const Tag = styled.span<TagProps>`
  align-items: center;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.default};
  justify-content: center;


  ${background}
  ${borderRadius}
  ${color}
  ${cursorStyle}
  ${fontWeight}
  ${opacity}
  ${space}
  ${tagStyle}
`

Tag.defaultProps = {
  borderRadius: '96px',
  cursor: 'pointer',
  opacity: 1.0,
  p: '12px 24px',
  variant: 'default',
}

export default Tag
