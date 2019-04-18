import styled from '@emotion/styled'
import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  gridColumnGap,
  GridColumnGapProps,
  gridColumn,
  GridColumnProps,
  gridTemplateColumns,
  GridTemplatesColumnsProps,
  gridTemplateRows,
  GridTemplatesRowsProps,
  gridGap,
  GridGapProps,
  gridRowGap,
  GridRowGapProps,
  gridRow,
  GridRowProps,
  justifyContent,
  JustifyContentProps,
  space,
  SpaceProps,
} from 'styled-system'

type GridProps = AlignContentProps &
  AlignItemsProps &
  GridColumnGapProps &
  GridColumnProps &
  GridTemplatesColumnsProps &
  GridTemplatesRowsProps &
  GridGapProps &
  GridRowGapProps &
  GridRowProps &
  JustifyContentProps &
  SpaceProps

const Grid = styled.div<GridProps>`
  display: grid;

  ${alignContent}
  ${alignItems}
  ${gridColumnGap}
  ${gridColumn}
  ${gridTemplateColumns}
  ${gridTemplateRows}
  ${gridGap}
  ${gridRowGap}
  ${gridRow}
  ${justifyContent}
  ${space}
`

Grid.defaultProps = {
  gridGap: ['small', 'medium', 'large'],
}

export default Grid
