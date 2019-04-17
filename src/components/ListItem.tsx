import styled from '@emotion/styled'
import { color, ColorProps, space, SpaceProps } from 'styled-system'

type ListItemProps = React.HTMLProps<HTMLElement> & ColorProps & SpaceProps

const ListItem = styled.li<ListItemProps>`
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  ${color}
  ${space}
`

ListItem.defaultProps = {
  color: 'black',
  p: 10,
}

export default ListItem
