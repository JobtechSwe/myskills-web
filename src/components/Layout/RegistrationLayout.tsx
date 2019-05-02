import React from 'react'
import StepIndicator from '../StepIndicator'
import styled from '@emotion/styled'
import Button from '../Button'
import Flex from '../Flex'
import Icon from '../../assets/icons/navigation_arrow.svg'
import { RouteComponentProps, navigate } from '@reach/router'

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
  & > div {
    flex-basis: 80%;
  }
`

const ArrowIcon = styled.img``

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
        <ArrowIcon onClick={() => history.back()} src={Icon} />
        <StepIndicator step={step} />
      </NavigationContainer>
      {headerText}
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
