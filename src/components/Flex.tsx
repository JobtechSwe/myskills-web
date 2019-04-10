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

type FlexContainerProps = AlignItemsProps &
  FlexProps &
  FlexBasisProps &
  FlexDirectionProps &
  FlexWrapProps &
  JustifyContentProps &
  SpaceProps

const Flex = styled.div<FlexContainerProps>`
  display: flex;

  ${alignItems}
  ${flexBasis}
  ${flexDirection}
  ${flexWrap}
  ${flex}
  ${justifyContent}
  ${space}
`

export default Flex
