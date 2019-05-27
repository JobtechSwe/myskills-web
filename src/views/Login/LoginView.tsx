import React from 'react'
import { OpenInApp } from 'components/ButtonLink'
import styled from '@emotion/styled'
import Flex from '../../components/Flex'
import logotypeIcon from '../../assets/images/logo.svg'
import egendataLogotypeIcon from '../../assets/icons/egendata_logo.svg'
import { H3, Paragraph } from '../../components/Typography'
import Info from '../../components/Info'
import { Link } from '../../components/Link'

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

const LoginView: React.FC<LoginViewProps> = ({ loginUrl }) => {
  return (
    <>
      <Wrapper>
        <Flex
          alignItems="center"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <img alt="logo" src={logotypeIcon} />
          <p>vill öpnna</p>
          <img alt="egendatalogo" src={egendataLogotypeIcon} />
          <OpenInApp url={loginUrl} />
          <div>
            <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
              Få kontroll över din data
            </H3>
            <Paragraph color="black" mb="large" mt="small">
              Genom Egendata väljer du själv var din information ska sparas.
            </Paragraph>
          </div>
          <div>
            <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
              Spara tid
            </H3>
            <Paragraph color="black" mb="large" mt="small">
              Hämta och dela din information istället för att skapa ett nytt CV
              för varje jobbsökarsajt.
            </Paragraph>
          </div>
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
