import React from 'react'
import StepIndicator from '../StepIndicator'
import styled from '@emotion/styled'
import Button from '../Button'
import Grid from '../Grid'
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

const NavigationContainer = styled.nav`
  align-self: start;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > div:last-child {
    flex: 1;
  }
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
    <Grid height="100vh" p="large">
      <NavigationContainer>
        <Flex alignSelf="stretch" justifyContent="center" mb="small">
          <div
            onClick={() => history.back()}
            onKeyUp={() => history.back()}
            role="button"
            tabIndex={0}
          >
            <img alt="Go back" src={Icon} />
          </div>

          <StepIndicator step={step} />
        </Flex>
        {headerText}
      </NavigationContainer>
      {children}
      <Grid alignSelf="end" justifyContent="stretch">
        <Button onClick={() => onNextClick(nextPath, childFn, childFnArgs)}>
          {nextBtnText}
        </Button>
      </Grid>
    </Grid>
  )
}

export default RegistrationLayout
