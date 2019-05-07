import React, { useState, useLayoutEffect } from 'react'
import styled from '@emotion/styled'

interface StepIndicatorProps {
  step: number
}

interface DotProps {
  isActive: boolean
}

const Dot = styled.div<DotProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${({ isActive }) => (isActive ? 'green' : 'lightgrey')};
  margin: 5px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StepIndicator: React.FC<StepIndicatorProps> = ({ step }) => {
  const [val, set] = useState(step)
  const routes = 6

  const dots = new Array(routes)
    .fill('x')
    .map((_, i) => <Dot isActive={i < val} key={i} />)

  useLayoutEffect(() => set(step), [step])

  return <Container>{dots}</Container>
}

export default StepIndicator
