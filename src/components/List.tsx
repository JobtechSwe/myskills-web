import styled from '@emotion/styled'
import { color, ColorProps, space, SpaceProps } from 'styled-system'

type ListProps = React.HTMLProps<HTMLUListElement> & ColorProps & SpaceProps

const List = styled.ul<ListProps>`
  list-style: none;
  ${color}
  ${space}
`

List.defaultProps = {
  color: 'lassekongo',
  p: 0,
}

export default List
