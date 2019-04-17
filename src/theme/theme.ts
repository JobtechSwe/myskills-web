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
    color: colors.lassekongo,
    backgroundColor: colors.white,
  },
}

const typography: Typography = {
  default: 'sans-serif',
}

const fontSizes = {
  small: 14,
  medium: 16,
  large: 26,
}

const space = {
  none: 0,
  small: 16,
  medium: 24,
  large: 32,
}

const theme = {
  colors,
  buttons,
  fonts: typography,
  fontSizes,
  space,
}

export default theme
