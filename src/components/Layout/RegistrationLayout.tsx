import React from 'react'
import StepIndicator from '../StepIndicator'
import styled from '@emotion/styled'
import Button from '../Button'
import Flex from '../Flex'
import Icon from '../../assets/icons/navigation_arrow.svg'
import { RouteComponentProps, navigate } from '@reach/router'
import { H3 } from '../Typography'

interface RegistrationLayoutProps {
  step: number
  nextPath: string
  nextBtnText?: string
  childFn?: any
  headerText: string
  childFnArgs?: any
}

const Container = styled.section`
  padding: 26px;
  width: 100%;
`

const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const ArrowContainer = styled.div`
  position: absolute;
  left: 0;
`

const PageName = styled.p`
  width: 100%;
  text-align: center;
`

const onNextClick = async (
  nextPath: string,
  childFn: any,
  childFnArgs: any
) => {
  if (childFn) {
    childFn()
  }
  navigate(`/skapa-cv/${nextPath}`, { ...childFnArgs })
}

const RegistrationLayout: React.FC<
  RouteComponentProps & RegistrationLayoutProps
> = ({
  children,
  step,
  nextPath,
  nextBtnText = 'Fortsätt',
  headerText,
  childFn,
  childFnArgs = {},
}) => {
  return (
    <Container className="layout">
      <NavigationContainer>
        <ArrowContainer
          onClick={() => history.back()}
          onKeyUp={() => history.back()}
          role="button"
          tabIndex={0}
        >
          <img alt="Go back" src={Icon} />
        </ArrowContainer>

        <StepIndicator step={step} />
      </NavigationContainer>
      <H3 fontSize={'medium'} mb={'small'} mt={'small'} textAlign="center">
        {headerText}
      </H3>
      {children}
      <Flex justifyContent="center">
        <Button onClick={() => onNextClick(nextPath, childFn, childFnArgs)}>
          {nextBtnText}
        </Button>
      </Flex>
    </Container>
  )
}

export default RegistrationLayout
