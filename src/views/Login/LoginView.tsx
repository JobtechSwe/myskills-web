import React from 'react'
import { OpenInApp } from 'components/ButtonLink'
import styled from '@emotion/styled'
import Flex from '../../components/Flex'
import Grid from '../../components/Grid'
import logotypeIcon from '../../assets/images/logo.svg'
import egendataLogotypeIcon from '../../assets/icons/egendata_logo.svg'
import egendataLogotypeIconWhite from '../../assets/icons/egendata_logo_white.svg'
import { H3, Paragraph } from '../../components/Typography'
import Info from '../../components/Info'
import { Link } from '../../components/Link'
import check from '../../assets/icons/check_blue.svg'

interface LoginViewProps {
  loginUrl: string
}

const Wrapper = styled.div`
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

const LogosWrapper = styled.div`
  margin: 50px 0;
  text-align: center;
`

const Image = styled.img`
  margin-top: 1px;
  margin-left: 7px;
`

const InfoBulletsWrapper = styled.div`
  margin: 40px 0;
  padding: 0 30px;
`

const LoginView: React.FC<LoginViewProps> = ({ loginUrl }) => {
  return (
    <>
      <Wrapper>
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <LogosWrapper>
            <img alt="logo" src={logotypeIcon} />
            <Paragraph mb={10} mt={10}>
              vill öpnna
            </Paragraph>
            <img alt="egendatalogo" src={egendataLogotypeIcon} />
          </LogosWrapper>
          <OpenInApp url={loginUrl}>
            Logga in med{' '}
            <Image alt="egendatalogo" src={egendataLogotypeIconWhite} />
          </OpenInApp>
          <InfoBulletsWrapper>
            <Grid gridTemplateColumns="20px 1fr">
              <img alt="check" src={check} />
              <div>
                <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
                  Få kontroll över din data
                </H3>
                <Paragraph color="black" mb="large" mt="small">
                  Genom Egendata väljer du själv var din information ska sparas.
                </Paragraph>
              </div>
            </Grid>
            <Grid gridTemplateColumns="20px 1fr">
              <img alt="check" src={check} />
              <div>
                <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
                  Spara tid
                </H3>
                <Paragraph color="black" mb="large" mt="small">
                  Hämta och dela din information istället för att skapa ett nytt
                  CV för varje jobbsökarsajt.
                </Paragraph>
              </div>
            </Grid>
          </InfoBulletsWrapper>
          <Info>
            <Link textDecoration="underline">
              Läs mer om hur Egendata fungerar
            </Link>
          </Info>
        </Flex>
      </Wrapper>
    </>
  )
}

export default LoginView
