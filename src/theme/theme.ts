interface Color {
  athensGray: '#E9ECF1'
  black: '#000000'
  cloudBurst: '#1F215F'
  green: 'green'
  persianBlue: '#202ED1'
  persianBlueDark: '#1B27B2'
  redOrange: '#FE451D'
  seashellPeach: '#FFF2EC'
  white: 'white'
  wildSand: '#F6F6F6'
}

interface Typography {
  default: 'sans-serif'
}

const colors: Color = {
  athensGray: '#E9ECF1',
  black: '#000000',
  cloudBurst: '#1F215F',
  green: 'green',
  persianBlue: '#202ED1',
  persianBlueDark: '#1B27B2',
  redOrange: '#FE451D',
  seashellPeach: '#FFF2EC',
  white: 'white',
  wildSand: '#F6F6F6',
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
  secondaryBlack: {
    color: colors.black,
    backgroundColor: colors.white,
  },
}

const tags = {
  default: {
    backgroundColor: colors.wildSand,
    color: colors.black,
    fontWeight: 500,
  },
  active: {
    backgroundColor: colors.seashellPeach,
    color: colors.redOrange,
    fontWeight: 'bold',
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
  buttons,
  colors,
  fontSizes,
  fonts: typography,
  space,
  tags,
}

export default theme
