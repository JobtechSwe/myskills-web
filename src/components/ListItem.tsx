import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  background,
  BackgroundProps,
} from 'styled-system'

type ListItemProps = React.HTMLProps<HTMLElement> &
  ColorProps &
  SpaceProps &
  BackgroundProps

const ListItem = styled.li<ListItemProps>`
  ${color}
  ${space}
  ${background}
`

ListItem.defaultProps = {
  color: 'black',
  p: 10,
}

export default ListItem
