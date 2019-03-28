import React from 'react'
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

export const Grid = styled.div`
  display: grid;

  ${alignContent}
  ${alignItems}
  ${gridColumnGap}
  ${gridColumn}
  ${gridGap}
  ${gridRowGap}
  ${gridRow}
  ${justifyContent}
  ${space}
`

type GridProps = AlignContentProps &
  AlignItemsProps &
  GridColumnGapProps &
  GridColumnProps &
  GridGapProps &
  GridRowGapProps &
  GridRowProps &
  JustifyContentProps &
  SpaceProps

const common: GridProps = {
  gridGap: ['small', 'medium', 'large'],
}

Grid.defaultProps = {
  ...common,
}
