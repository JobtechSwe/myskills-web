import React, { useState, useLayoutEffect } from 'react'
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
  margin: 6px;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.dotGreen : theme.colors.athensGray};
  border: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.colors.athensGray} ` : 'none'};
`

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StepIndicator: React.FC<StepIndicatorProps> = ({ step }) => {
  const [val, set] = useState(step)
  const routes = 6

  const dots = new Array(routes)
    .fill('')
    .map((_, i) => <Dot isActive={i < val} key={i} />)

  useLayoutEffect(() => set(step), [step])

  return <Container>{dots}</Container>
}

export default StepIndicator
