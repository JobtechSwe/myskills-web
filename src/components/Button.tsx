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

const Button = styled.button`
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
type VariantProps = {
  variant: 'primary' | 'secondary'
}

type ButtonProps = ButtonStyleProps &
  BorderProps &
  ColorProps &
  FontFamilyProps &
  FontSizeProps &
  SpaceProps &
  VariantProps

const common: ButtonProps = {
  border: 0,
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
  p: '10px 20px',
  variant: 'primary',
}

Button.defaultProps = {
  ...common,
}

export default Button
