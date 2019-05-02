import React from 'react'
import StepIndicator from '../StepIndicator'
import styled from '@emotion/styled'
import { InternalLink } from '../Link'
import Button from '../Button'
import Flex from '../Flex'
import ArrowIcon from '../../assets/icons/navigation_arrow'
import { RouteComponentProps, navigate } from '@reach/router'

interface RegistrationLayoutProps {
  step: number
  nextPath: string
  nextBtnText?: string
  childSubmit?: any
}

const Container = styled.section`
  padding: 26px;
  width: 100%;
  min-height: 100vh;
`

const onNextClick = async (nextPath: string, childSubmit: any) => {
  if (childSubmit) {
    childSubmit()
  }
  navigate(`./${nextPath}`)
}

const RegistrationLayout: React.FC<
  RouteComponentProps & RegistrationLayoutProps
> = ({ children, step, nextPath, nextBtnText = 'Fortsätt', childSubmit }) => {
  return (
    <Container className="layout">
      <StepIndicator step={step} />
      <ArrowIcon />
      {children}
      <Flex justifyContent="center" style={{ border: '1px solid black' }}>
        <InternalLink to={nextPath}>
          <Button onClick={() => onNextClick(nextPath, childSubmit)}>
            {nextBtnText}
          </Button>
        </InternalLink>
      </Flex>
    </Container>
  )
}

export default RegistrationLayout
