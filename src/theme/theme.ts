interface Color {
  lassekongo: 'dodgerblue'
  white: 'white'
}

interface Typography {
  default: 'sans-serif'
}

const buttons = {
  primary: {
    color: 'white',
    backgroundColor: '#28a745',
  },
  secondary: {
    color: 'white',
    backgroundColor: '#6c757d',
  },
}

const colors: Color = {
  lassekongo: 'dodgerblue',
  white: 'white',
}

const sizes = [0, 16, 24, 32]

const typography: Typography = {
  default: 'sans-serif',
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
  colors,
  buttons,
  fontFamily: typography,
  fontSizes,
  space,
}

export default theme
