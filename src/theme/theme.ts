interface Color {
  lassekongo: 'dodgerblue'
  white: 'white'

  green: 'green'
}

interface Typography {
  default: 'sans-serif'
}

const colors: Color = {
  lassekongo: 'dodgerblue',
  white: 'white',
  green: 'green',
}

const buttons = {
  primary: {
    color: colors.white,
    backgroundColor: colors.lassekongo,
  },
  secondary: {
    color: colors.white,
    backgroundColor: colors.green,
  },
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
