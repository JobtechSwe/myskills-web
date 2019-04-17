import styled from '@emotion/styled'
import { color, ColorProps, space, SpaceProps } from 'styled-system'

type ListProps = React.HTMLProps<HTMLUListElement> & ColorProps & SpaceProps

const List = styled.ul<ListProps>`
  list-style: none;
  width: 100%;

  ${color}
  ${space}
`

List.defaultProps = {
  color: 'blue',
  p: 0,
}

export default List
