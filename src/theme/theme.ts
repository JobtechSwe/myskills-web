interface Color {
  athensGray: '#E9ECF1'
  cloudBurst: '#1F215F'
  green: 'green'
  persianBlue: '#202ED1'
  white: 'white'
}

interface Typography {
  default: 'sans-serif'
}

const colors: Color = {
  athensGray: '#E9ECF1',
  cloudBurst: '#1F215F',
  green: 'green',
  persianBlue: '#202ED1',
  white: 'white',
}

const buttons = {
  primary: {
    color: colors.white,
    backgroundColor: colors.persianBlue,
  },
  secondary: {
    color: colors.persianBlue,
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
