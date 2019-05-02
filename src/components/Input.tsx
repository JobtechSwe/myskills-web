import styled from '@emotion/styled'
import {
  border,
  BorderProps,
  borderColor,
  BorderColorProps,
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

type InputProps = React.HTMLProps<HTMLInputElement> &
  BorderColorProps &
  BorderProps &
  BorderRadiusProps &
  ColorProps &
  FontFamilyProps &
  FontSizeProps &
  SpaceProps

const Input = styled.input<InputProps>`
  ${border}
  ${borderColor}
  ${borderRadius}
  ${color}
  ${fontSize}
  ${space}
`

Input.defaultProps = {
  border: '1px solid',
  borderRadius: '5px',
  borderColor: 'athensGray',
  fontFamily: 'default',
  fontSize: 'medium',
  p: '12px',
}

export default Input
