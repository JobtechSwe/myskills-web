import React, { useState, useLayoutEffect } from 'react'
import Flex from './Flex'
import styled from '@emotion/styled'

interface StepIndicatorProps {
  step: number
}

interface DotProps {
  isActive: boolean
}

const Dot = styled.div<DotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.shamrock : theme.colors.athensGray};
  margin: 5px;
`

const StepIndicator: React.FC<StepIndicatorProps> = ({ step }) => {
  const [val, set] = useState(step)
  const routes = 6

  const dots = new Array(routes)
    .fill('x')
    .map((_, i) => <Dot isActive={i < val} key={i} />)

  useLayoutEffect(() => set(step), [step])

  return (
    <Flex flex={1} justifyContent="center">
      {dots}
    </Flex>
  )
}

export default StepIndicator
