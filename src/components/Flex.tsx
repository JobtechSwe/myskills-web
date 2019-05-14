import styled from '@emotion/styled'
import {
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
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
  zIndex,
  ZIndexProps,
} from 'styled-system'

type FlexContainerProps = AlignItemsProps &
  AlignSelfProps &
  FlexProps &
  FlexBasisProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps &
  SpaceProps &
  ZIndexProps

const Flex = styled.div<FlexContainerProps>`
  display: flex;

  ${alignItems}
  ${alignSelf}
  ${flexBasis}
  ${flexDirection}
  ${flexWrap}
  ${flex}
  ${justifyContent}
  ${space}
  ${zIndex}
`

export default Flex
