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

type ButtonProps = ButtonStyleProps &
  BorderProps &
  ColorProps &
  FontFamilyProps &
  FontSizeProps &
  SpaceProps

const common: ButtonProps = {
  border: 0,
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
  p: '10px 20px',
}

Button.defaultProps = {
  ...common,
  variant: 'primary',
}

export default Button
