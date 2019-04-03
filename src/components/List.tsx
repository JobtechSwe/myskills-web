import styled from '@emotion/styled'
import { color, ColorProps, space, SpaceProps } from 'styled-system'

const List = styled.ul`
  list-style: none;

  ${color}
  ${space}
`

type ListProps = ColorProps & SpaceProps

const common: ListProps = {
  color: 'lassekongo',
  p: 0,
}

List.defaultProps = {
  ...common,
}

export default List
