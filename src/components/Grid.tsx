import styled from '@emotion/styled'
import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
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
  justifyItems,
  JustifyItemsProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from 'styled-system'

type GridProps = React.HTMLProps<HTMLElement> &
  AlignContentProps &
  AlignItemsProps &
  AlignSelfProps &
  BorderRadiusProps &
  ColorProps &
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
  JustifyItemsProps &
  SpaceProps &
  WidthProps

const Grid = styled.div<GridProps>`
  display: grid;

  ${alignContent}
  ${alignItems}
  ${alignSelf}
  ${borderRadius}
  ${color}
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
  ${justifyItems}
  ${space}
  ${width}
`

Grid.defaultProps = {
  gridGap: ['small', 'medium', 'large'],
}

export default Grid
