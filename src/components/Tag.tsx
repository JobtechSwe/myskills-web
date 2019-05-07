import styled from '@emotion/styled'
import {
  color,
  ColorProps,
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
  SpaceProps &
  BackgroundProps &
  BorderRadiusProps &
  VariantProps

const Tag = styled.span<TagProps>`
  align-items: center;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.default};
  justify-content: center;


  ${color}
  ${space}
  ${background}
  ${borderRadius}
  ${tagStyle}
  ${cursorStyle}
`

Tag.defaultProps = {
  borderRadius: '96px',
  p: '12px 24px',
  variant: 'default',
  cursor: 'pointer',
}

export default Tag
