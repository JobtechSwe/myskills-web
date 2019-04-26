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
} from 'styled-system'

const tagStyle = variant({
  key: 'tags',
})

type VariantProps = {
  variant?: 'default' | 'active'
}

type TagProps = React.HTMLProps<HTMLElement> &
  ColorProps &
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
`

Tag.defaultProps = {
  borderRadius: '96px',
  p: '12px 24px',
  variant: 'default',
}

export default Tag
