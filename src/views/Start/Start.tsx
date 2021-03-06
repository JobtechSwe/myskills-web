import React, { useRef } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps } from '@reach/router'
import Button from '../../components/Button'
import { Link, InternalLink } from '../../components/Link'
import { Bold, H2, H3, Paragraph } from '../../components/Typography'
import styled from '@emotion/styled'
import logotypeIcon from '../../assets/images/logo.svg'
import cloudsIcon from '../../assets/images/clouds.svg'
import Info from '../../components/Info'

const LogoContainer = styled.img`
  margin-top: 10%;
`

const StartBlock = styled.div`
  align-items: center;
  background: ${({ theme }) => `radial-gradient(
    647.69px at 6.66% 96.53%,
    ${theme.colors.yourPink} 0%,
    ${theme.colors.seashellPeach} 100%
  )`};
  display: flex;
  /* Explanation: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
  height: calc(var(--vh, 1vh) * 100);
  justify-content: center;
  padding: 25px;
`

const InfoBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 25px;
`

const Divider = styled.hr`
  background: ${({ theme }) => theme.colors.persianBlue};
  border: 0;
  height: 1px;
  width: 200px;
`

const Clouds = styled.img`
  width: 70%;
  @media (max-width: 320px) {
    max-height: 160px;
  }

  @media (min-height: 768px) {
    margin-bottom: 55px;
    margin-top: 55px;
  }
`

const Start: React.FC<RouteComponentProps> = () => {
  const infoElement = useRef<HTMLDivElement>(null)
  const scrollTo = () => {
    if (infoElement.current) {
      infoElement.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <StartBlock>
        <Flex
          alignItems="center"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <LogoContainer alt="logo" src={logotypeIcon} />
          <Divider />
          <Paragraph color="persianBlue" fontWeight="bold" mt={0}>
            ditt digitala CV
          </Paragraph>
          <Clouds alt="clouds" src={cloudsIcon} />
          <InternalLink mt={30} to="/skapa-cv" width={1}>
            <Button variant="primary" width={1}>
              Skapa CV
            </Button>
          </InternalLink>
          <InternalLink mt={10} to="/logga-in" width={1}>
            <Button variant="secondaryBlack" width={1}>
              Logga in med <Bold as="span">Egendata</Bold>
            </Button>
          </InternalLink>
          <Info>
            <Paragraph m={0}>
              Med Egendata får du kontroll över din data.{' '}
              <Link onClick={scrollTo} textDecoration="underline">
                Läs mer om hur det fungerar
              </Link>
            </Paragraph>
          </Info>
        </Flex>
      </StartBlock>
      <InfoBlock ref={infoElement}>
        <H2
          color="black"
          fontSize={24}
          mb="large"
          mt="large"
          textAlign="center"
        >
          Hur fungerar det?
        </H2>
        <div>
          <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
            Skapa din profil
          </H3>
          <Paragraph color="black" mb="large" mt="small">
            Svara på frågor om dig själv och skapa ditt CV.
          </Paragraph>
        </div>
        <div>
          <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
            Lagra ditt CV
          </H3>
          <Paragraph color="black" mb="large">
            Genom Egendata väljer du själv var ditt CV ska sparas.
          </Paragraph>
        </div>
        <div>
          <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
            Spara tid
          </H3>
          <Paragraph color="black" mb="large">
            Hämta och dela din information istället för att skapa ett nytt CV
            för varje jobbsökarsajt.
          </Paragraph>
        </div>
      </InfoBlock>
    </>
  )
}

export default Start
