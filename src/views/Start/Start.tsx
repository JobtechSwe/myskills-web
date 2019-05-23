import React, { useRef } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps } from '@reach/router'
import Button from '../../components/Button'
import { Link, InternalLink } from '../../components/Link'
import { Bold, H2, H3, Paragraph } from '../../components/Typography'
import styled from '@emotion/styled'
import logotypeIcon from '../../assets/images/logo.svg'
import cloudsIcon from '../../assets/images/clouds.svg'
import infoIcon from '../../assets/images/info.svg'

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
  justify-content: center;
  padding: 25px;
  height: 100vh;
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
  border-radius: 5px;
`

const Info = styled.div`
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  padding: 15px;
  margin: 30px 0 0 0;
`

const Clouds = styled.img`
  @media (max-width: 320px) {
    max-height: 160px;
  }

  @media (min-height: 768px) {
    margin-top: 65px;
    margin-bottom: 50px;
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
          justifyContent="center"
        >
          <LogoContainer alt="logo" src={logotypeIcon} />
          <Divider />
          <Paragraph color="persianBlue" fontWeight="bold" mt={0}>
            Ditt digitala CV
          </Paragraph>
          <Clouds alt="clouds" src={cloudsIcon} />
          <InternalLink mt={30} to="/skapa-cv" width={1}>
            <Button variant="primary" width={1}>
              Skapa CV
            </Button>
          </InternalLink>
          <InternalLink mt={10} to="/login" width={1}>
            <Button variant="secondaryBlack" width={1}>
              Logga in med <Bold as="span">Egendata</Bold>
            </Button>
          </InternalLink>
          <Info>
            <img alt="info icon" src={infoIcon} />
            <Paragraph mb={0} ml={10} mt={0}>
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
