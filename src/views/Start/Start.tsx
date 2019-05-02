import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps } from '@reach/router'
import Button from '../../components/Button'
import { Link, InternalLink } from '../../components/Link'
import { H1, H2, H3, Paragraph } from '../../components/Typography'
import styled from '@emotion/styled'

const StartBlock = styled.div`
  align-items: flex-end;
  background: ${({ theme }) => theme.colors.persianBlue} url('/images/dart.svg')
    no-repeat top left;
  background-size: contain;
  display: flex;
  height: 100vh;
  padding: 25px;
`

const InfoBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 25px;
`

const Divider = styled.hr`
  background: ${({ theme }) => theme.colors.white};
  border: 0;
  height: 1px;
  width: calc(100% - 50px);
`

const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.persianBlueDark};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: 15px;
  margin: 80px 0 25px 0;
`

const ReadMoreLink = styled(Link)`
  text-decoration: underline;
`

const Start: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <StartBlock>
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <H1 color="white" fontSize={36} mb={5}>
            Nå ditt drömjobb!
          </H1>
          <Divider />
          <Paragraph color="white" mt={0}>
            Registrera ditt CV i 5 enkla steg
          </Paragraph>
          <InternalLink mt={100} to="/skapa-cv" width={1}>
            <Button variant="secondary" width={1}>
              Skapa CV
            </Button>
          </InternalLink>
          <InternalLink mt={10} to="/login" width={1}>
            <Button variant="secondaryBlack" width={1}>
              Login med Egendata
            </Button>
          </InternalLink>
          <Info>
            <img alt="info icon" src="/images/info.svg" />
            <Paragraph mb={0} ml={10} mt={0}>
              Med Egendata får du kontroll över din data.{' '}
              <ReadMoreLink>Läs mer om hur det fungerar</ReadMoreLink>
            </Paragraph>
          </Info>
        </Flex>
      </StartBlock>
      <InfoBlock>
        <H2
          color="cloudBurst"
          fontSize={24}
          mb="large"
          mt="large"
          textAlign="center"
        >
          Hur fungerar det?
        </H2>
        <div>
          <H3 color="cloudBurst" fontSize={16} fontWeight="bold">
            Skapa en profil
          </H3>
          <Paragraph color="cloudBurst" mb={40} mt={10}>
            Svara på frågor om dig själv och skapa ditt CV.
          </Paragraph>
        </div>
        <div>
          <H3 color="cloudBurst" fontSize={16} fontWeight="bold">
            Spara ditt CV
          </H3>
          <Paragraph color="cloudBurst" mt={10}>
            Genom Egendata väljer du själv var ditt CV ska sparas.
          </Paragraph>
        </div>
      </InfoBlock>
    </div>
  )
}

export default Start
