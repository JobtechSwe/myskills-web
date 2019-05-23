interface Color {
  alabaster: '#F8F8F8'
  alto: '#E0E0E0'
  athensGray: '#E9ECF1'
  black: '#000000'
  bitterSweet: '#FF795B'
  cloudBurst: '#1F215F'
  persianBlue: '#202ED1'
  persianBlueDark: '#1B27B2'
  redOrange: '#FE451D'
  seashellPeach: '#FFF2EC'
  shamrock: '#30C27F'
  silverChalice: '#B2B2B2'
  yourPink: '#FFCEC2'
  white: 'white'
  whiteLilac: '#F1F1F9'
  wildSand: '#F6F6F6'
}

interface Typography {
  default: 'Lato'
}

const colors: Color = {
  alabaster: '#F8F8F8',
  alto: '#E0E0E0',
  athensGray: '#E9ECF1',
  black: '#000000',
  bitterSweet: '#FF795B',
  cloudBurst: '#1F215F',
  persianBlue: '#202ED1',
  persianBlueDark: '#1B27B2',
  redOrange: '#FE451D',
  seashellPeach: '#FFF2EC',
  shamrock: '#30C27F',
  silverChalice: '#B2B2B2',
  yourPink: '#FFCEC2',
  white: 'white',
  whiteLilac: '#F1F1F9',
  wildSand: '#F6F6F6',
}

const buttons = {
  disabled: {
    backgroundColor: colors.wildSand,
    color: colors.silverChalice,
  },
  primary: {
    color: colors.white,
    backgroundColor: colors.persianBlue,
  },
  secondary: {
    color: colors.persianBlue,
    backgroundColor: colors.white,
  },
  inActive: {
    backgroundColor: colors.wildSand,
    color: colors.black,
  },
  active: {
    backgroundColor: colors.seashellPeach,
    color: colors.redOrange,
    fontWeight: 700,
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
  default: 'Lato',
}

const fontSizes = {
  xsmall: 12,
  small: 14,
  medium: 16,
  large: 24,
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
