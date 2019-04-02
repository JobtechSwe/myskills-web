import styled from '@emotion/styled'
import {
  border,
  BorderProps,
  buttonStyle,
  ButtonStyleProps,
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

const Button = styled.button`
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  ${border}
  ${buttonStyle}
  ${color}
  ${fontSize}
  ${space}
`

type ButtonProps = ButtonStyleProps &
  BorderProps &
  ColorProps &
  FontSizeProps &
  SpaceProps

const common: ButtonProps = {
  border: 0,
  fontSize: ['small', 'medium'],
  p: '10px 20px',
}

Button.defaultProps = {
  ...common,
  variant: 'primary',
}

export default Button
