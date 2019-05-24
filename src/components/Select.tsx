import styled from '@emotion/styled'
import selectArrow from 'assets/icons/select_arrow.svg'
import {
  alignSelf,
  AlignSelfProps,
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
  width,
  WidthProps,
} from 'styled-system'

type SelectProps = React.HTMLProps<HTMLSelectElement> &
  AlignSelfProps &
  BorderColorProps &
  BorderProps &
  BorderRadiusProps &
  ColorProps &
  FontFamilyProps &
  FontSizeProps &
  SpaceProps &
  WidthProps

const Select = styled.select<SelectProps>`
  ${alignSelf}
  ${border}
  ${borderColor}
  ${borderRadius}
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
  ${width}
  display: block;
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: .6em 1.4em .5em .8em;
	width: 100%;
	max-width: 100%; 
	box-sizing: border-box;
	margin: 0;

  background-image: url(${selectArrow});
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .85em auto, 100%;

  &::-ms-expand {
	display: none;
}

&:focus {

	color: #222; 
	outline: none;
}
& > option {
	font-weight:normal;
}
`

Select.defaultProps = {
  bg: 'white',
  border: '1px solid',
  borderRadius: '4px',
  borderColor: 'athensGray',
  fontFamily: 'default',
  fontSize: 'medium',
  p: '12px',
}

export default Select
