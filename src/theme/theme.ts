interface Color {
  lassekongo: 'dodgerblue'
  white: 'white'
}

const color: Color = {
  lassekongo: 'dodgerblue',
  white: 'white',
}

const sizes = [0, 16, 24, 32]

const typography = {
  default: 'Arial',
}

const fontSizes = {
  small: sizes[1],
  medium: sizes[2],
  large: sizes[3],
}

const space = {
  none: sizes[0],
  small: sizes[1],
  medium: sizes[2],
  large: sizes[3],
}

const theme = {
  color,
  fontSizes,
  space,
  typography,
}

export default theme
