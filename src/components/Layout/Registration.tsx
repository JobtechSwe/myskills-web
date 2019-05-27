import React from 'react'
import StepIndicator from 'components/StepIndicator'
import styled from '@emotion/styled'
import Button, { VariantProps } from 'components/Button'
import { Paragraph } from '../Typography'
import Grid from 'components/Grid'
import Flex from 'components/Flex'
import { handleFocusKeyDown } from 'utils/helpers'
import NavigationIconWhite from 'assets/icons/navigation_arrow_white.svg'
import NavigationIconBlack from 'assets/icons/navigation_arrow.svg'
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

const Layout = styled(Grid)<RouteComponentProps>``

Layout.defaultProps = {
  gridTemplateRows: 'auto 1fr auto',
  height: 'calc(var(--vh, 1vh) * 100)',
  p: 'large',
  gridGap: 'small',
}

interface NavigationProps {
  step?: number
  section?: string
  variant?: 'white' | 'black'
}

const Navigation: React.FC<NavigationProps> = ({
  step,
  section,
  variant = 'black',
}) => (
  <NavigationContainer>
    <Flex alignSelf="stretch" justifyContent="center" mb="small">
      <Flex
        onClick={() => window.history.back()}
        onKeyDown={handleFocusKeyDown(() => window.history.back())}
        role="button"
        tabIndex={0}
        zIndex={1}
      >
        <img
          alt="Go back"
          src={variant === 'black' ? NavigationIconBlack : NavigationIconWhite}
        />
      </Flex>
      {step ? (
        <StepIndicator step={step} />
      ) : (
        <Flex alignItems="center" flex={1} justifyContent="center">
          <SectionHeader lineHeight="100%" mb={0} ml={-27} mt={0}>
            {section}
          </SectionHeader>
        </Flex>
      )}
    </Flex>
    {step && (
      <SectionHeader lineHeight="100%" mt={0}>
        {section}
      </SectionHeader>
    )}
  </NavigationContainer>
)

interface FooterButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FooterButton: React.FC<FooterButtonProps & VariantProps> = ({
  text,
  onClick,
  variant = 'primary',
}) => {
  return (
    <Flex justifyContent="center">
      <Button data-testid="okButton" onClick={onClick} variant={variant}>
        {text}
      </Button>
    </Flex>
  )
}

export { FooterButton, Navigation, Layout }
