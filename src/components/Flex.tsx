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
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system'

type FlexContainerProps = AlignItemsProps &
  FlexProps &
  FlexBasisProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps &
  PositionProps &
  SpaceProps

const Flex = styled.div<FlexContainerProps>`
  display: flex;

  ${alignItems}
  ${flexBasis}
  ${flexDirection}
  ${flexWrap}
  ${flex}
  ${justifyContent}
  ${position}
  ${space}
`

export default Flex
