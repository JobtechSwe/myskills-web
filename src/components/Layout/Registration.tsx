import React from 'react'
import StepIndicator from 'components/StepIndicator'
import styled from '@emotion/styled'
import Button from 'components/Button'
import { Paragraph } from '../Typography'
import Grid from 'components/Grid'
import Flex from 'components/Flex'
import { handleFocusKeyDown } from 'utils/helpers'
import Icon from 'assets/icons/navigation_arrow.svg'
import { RouteComponentProps } from '@reach/router'

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

const SectionHeader = styled(Paragraph)`
  text-transform: uppercase;
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<RouteComponentProps & LayoutProps> = ({ children }) => (
  <Grid
    gridTemplateRows="auto 1fr auto"
    height="calc(var(--vh, 1vh) * 100)"
    p="large"
  >
    {children}
  </Grid>
)

interface NavigationProps {
  step: number
  section: string
}

const Navigation: React.FC<NavigationProps> = ({ step, section }) => (
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
    <SectionHeader lineHeight="100%" mt={0}>
      {section}
    </SectionHeader>
  </NavigationContainer>
)

interface FooterButtonProps {
  disabled?: boolean
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FooterButton: React.FC<FooterButtonProps> = ({
  disabled,
  text,
  onClick,
}) => (
  <Flex justifyContent="center">
    <Button
      data-testid="okButton"
      onClick={onClick}
      variant={disabled ? 'disabled' : 'primary'}
    >
      {text}
    </Button>
  </Flex>
)

export { FooterButton, Navigation, Layout }
