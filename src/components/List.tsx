import styled from '@emotion/styled'
import {
  borders,
  BordersProps,
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  space,
  SpaceProps,
} from 'styled-system'

type ListProps = React.HTMLProps<HTMLUListElement> &
  BordersProps &
  BorderRadiusProps &
  ColorProps &
  SpaceProps

export const List = styled.ul<ListProps>`
  list-style: none;

  ${borders}
  ${borderRadius}
  ${color}
  ${space}
`

const SearchList = styled(List)<{ isOpen: boolean }>`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: ${({ theme }) => `0px 8px 16px 0px ${theme.colors.whiteLilac}`};
  max-height: 224px;
  overflow-x: hidden;
  overflow-y: auto;
`

List.defaultProps = {
  color: 'persianBlue',
  p: 0,
}

SearchList.defaultProps = {
  borderTop: 0,
  color: 'persianBlue',
  p: 0,
}

export { List as default, SearchList }
