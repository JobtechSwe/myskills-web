import React from 'react'
import StepIndicator from '../StepIndicator'
import styled from '@emotion/styled'
import { InternalLink } from '../Link'
import Button from '../Button'
import Flex from '../Flex'
import ArrowIcon from '../../assets/icons/navigation_arrow'
import { RouteComponentProps } from '@reach/router'

interface RegistrationLayoutProps {
  step: number
  buttonText?: string
  nextPath?: string
}

const Container = styled.section`
  padding: 26px;
  width: 100%;
  min-height: 100vh;
`

const RegistrationLayout: React.FC<
  RouteComponentProps & RegistrationLayoutProps
> = ({ children, step, nextPath }) => {
  return (
    <Container className="layout">
      <StepIndicator step={step} />
      <ArrowIcon />
      {children}
      <Flex justifyContent="center" style={{ border: '1px solid black' }}>
        {/* <InternalLink to={nextPath}> */}
        <Button>Nästa</Button>
        {/* </InternalLink> */}
      </Flex>
    </Container>
  )
}

export default RegistrationLayout
