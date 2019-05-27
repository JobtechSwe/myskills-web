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
  flex,
  FlexProps,
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
  variant?: 'primary' | 'secondary' | 'secondaryBlack' | 'inActive' | 'active'
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  BorderProps &
  BorderRadiusProps &
  ButtonStyleProps &
  ColorProps &
  FlexProps &
  FontFamilyProps &
  FontSizeProps &
  PositionProps &
  SpaceProps &
  VariantProps &
  WidthProps

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  ${borderRadius}
  ${border}
  ${buttonStyle}
  ${color}
  ${flex}
  ${fontFamily}
  ${fontSize}
  ${position}
  ${space}
  ${width}
`

Button.defaultProps = {
  border: 'none',
  borderRadius: '8px',
  flex: ['1', 'auto'],
  fontFamily: 'default',
  fontSize: ['medium'],
  p: '12px 42px',
  variant: 'primary',
}

export const FloatingContinueButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

export default Button
