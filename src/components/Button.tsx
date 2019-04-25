import styled from '@emotion/styled'
import {
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  buttonStyle,
  ButtonStyleProps,
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

type VariantProps = {
  variant?: 'primary' | 'secondary'
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  ButtonStyleProps &
  BorderRadiusProps &
  BorderProps &
  FontFamilyProps &
  FontSizeProps &
  SpaceProps &
  ColorProps &
  VariantProps

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  ${fontFamily}
  ${border}
  ${borderRadius}
  ${buttonStyle}
  ${color}
  ${fontSize}
  ${space}
`

Button.defaultProps = {
  border: 'none',
  borderRadius: '5px',
  fontFamily: 'default',
  fontSize: ['medium'],
  p: '12px 36px',
  variant: 'primary',
}

export default Button
