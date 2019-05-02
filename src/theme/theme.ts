interface Color {
  athensGray: '#E9ECF1'
  black: '#000000'
  bitterSweet: '#FF795B'
  cloudBurst: '#1F215F'
  persianBlue: '#202ED1'
  redOrange: '#FE451D'
  seashellPeach: '#FFF2EC'
  white: 'white'
  wildSand: '#F6F6F6'
}

interface Typography {
  default: 'Lato'
}

const colors: Color = {
  athensGray: '#E9ECF1',
  black: '#000000',
  bitterSweet: '#FF795B',
  cloudBurst: '#1F215F',
  persianBlue: '#202ED1',
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
  inActive: {
    backgroundColor: colors.wildSand,
    color: colors.black,
  },
  active: {
    backgroundColor: colors.seashellPeach,
    color: colors.redOrange,
    fontWeight: 700,
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
