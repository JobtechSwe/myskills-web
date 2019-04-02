import React from 'react'
import styled from '@emotion/styled'
import {
  alignItems,
  AlignItemsProps,
  flex,
  FlexProps,
  flexBasis,
  FlexBasisProps,
  flexDirection,
  FlexDirectionProps,
  flexWrap,
  FlexWrapProps,
  justifyContent,
  JustifyContentProps,
  space,
  SpaceProps,
} from 'styled-system'

export const Flex = styled.div`
  display: flex;

  ${alignItems}
  ${flexBasis}
  ${flexDirection}
  ${flexWrap}
  ${flex}
  ${justifyContent}
  ${space}
`

type FlexContainerProps = AlignItemsProps &
  FlexProps &
  FlexBasisProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps &
  SpaceProps
