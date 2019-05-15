import styled from '@emotion/styled'
import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  gridAutoFlow,
  GridAutoFlowProps,
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
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  space,
  SpaceProps,
} from 'styled-system'

type GridProps = AlignContentProps &
  AlignItemsProps &
  AlignSelfProps &
  GridAutoFlowProps &
  GridColumnGapProps &
  GridColumnProps &
  GridTemplatesColumnsProps &
  GridTemplatesRowsProps &
  GridGapProps &
  GridRowGapProps &
  GridRowProps &
  HeightProps &
  JustifyContentProps &
  SpaceProps

const Grid = styled.div<GridProps>`
  display: grid;

  ${alignContent}
  ${alignItems}
  ${alignSelf}
  ${gridAutoFlow}
  ${gridColumnGap}
  ${gridColumn}
  ${gridTemplateColumns}
  ${gridTemplateRows}
  ${gridGap}
  ${gridRowGap}
  ${gridRow}
  ${height}
  ${justifyContent}
  ${space}
`

Grid.defaultProps = {
  gridGap: ['small', 'medium', 'large'],
}

export default Grid
