import React from 'react'
import StepIndicator from 'components/StepIndicator'
import styled from '@emotion/styled'
import Button from 'components/Button'
import { Paragraph } from '../Typography'
import Grid from 'components/Grid'
import Flex from 'components/Flex'
import { handleFocusKeyDown } from 'utils/helpers'
import Icon from 'assets/icons/navigation_arrow.svg'
import { RouteComponentProps, navigate } from '@reach/router'

interface RegistrationLayoutProps {
  disableNextBtn?: boolean
  step: number
  nextPath?: string
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
  disableNextBtn = false,
  children,
  step,
  nextPath,
  nextBtnText = 'Fortsätt',
  headerText,
  childFn,
  childFnArgs = {},
}) => {
  return (
    <Grid
      gridTemplateRows="auto 1fr auto"
      height="calc(var(--vh, 1vh) * 100)"
      p="large"
    >
      <NavigationContainer>
        <Flex alignSelf="stretch" justifyContent="center" mb="small">
          <Flex
            onClick={() => window.history.back()}
            onKeyDown={handleFocusKeyDown(() => window.history.back())}
            role="button"
            tabIndex={0}
            zIndex={1}
          >
            <img alt="Go back" src={Icon} />
          </Flex>

          <StepIndicator step={step} />
        </Flex>
        <Paragraph lineHeight="100%" mt="none">
          {headerText}
        </Paragraph>
      </NavigationContainer>
      {children}
      {nextPath && (
        <Flex justifyContent="center">
          {disableNextBtn ? (
            <Button data-testid="okButton" variant="inActive">
              {nextBtnText}
            </Button>
          ) : (
            <Button
              data-testid="okButton"
              onClick={() => onNextClick(nextPath, childFn, childFnArgs)}
              variant={disableNextBtn ? 'inActive' : 'primary'}
            >
              {nextBtnText}
            </Button>
          )}
        </Flex>
      )}
    </Grid>
  )
}

export default RegistrationLayout
