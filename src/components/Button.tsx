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
  width,
  WidthProps,
} from 'styled-system'

type VariantProps = {
  variant?: 'primary' | 'secondary' | 'secondaryBlack'
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
  VariantProps &
  WidthProps

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
  ${width}
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
