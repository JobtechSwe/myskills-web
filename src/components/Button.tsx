import styled from '@emotion/styled'
import {
  border,
  BorderProps,
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
  ${buttonStyle}
  ${color}
  ${fontSize}
  ${space}
`

Button.defaultProps = {
  border: 'none',
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
  p: '10px 20px',
  variant: 'primary',
}

export default Button
