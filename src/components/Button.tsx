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
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system'

type VariantProps = {
  variant?: 'primary' | 'secondary' | 'inActive' | 'active'
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  ButtonStyleProps &
  BorderRadiusProps &
  BorderProps &
  FontFamilyProps &
  FontSizeProps &
  PositionProps &
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
  ${position}
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

export const FloatingContinueButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

export default Button
