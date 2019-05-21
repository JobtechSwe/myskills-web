import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { H1, Paragraph } from '../../components/Typography'
import present from '../../images/present.svg'
import styled from '@emotion/styled'
import Flex from '../../components/Flex'
import Button from '../../components/Button'

const Background = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => `radial-gradient(
  647.69px at 6.66% 96.53%,
  ${theme.colors.yourPink} 0%,
  ${theme.colors.seashellPeach} 100%
)`};
  flex-direction: column;
  height: 100vh;
  padding: 25px;
  text-align: center;
  color: ${({ theme }) => theme.colors.persianBlue};
  justify-content: center;
`

const RegistrationCompleted: React.FC<RouteComponentProps> = () => {
  return (
    <Background>
      <H1 color="persianBlue">Grattis!</H1>
      <Paragraph fontSize="medium">Ditt digitala CV är nu sparat.</Paragraph>

      <Paragraph fontSize="medium">
        Du har själv valt var din data lagras och är nu i full kontroll över hur
        och till vem din information ska delas.
      </Paragraph>

      <Paragraph fontSize="medium">
        Dessutom har du just gjort ditt liv enklare eftersom du nu bara behöver
        uppdatera ditt CV på ett enda ställe!
      </Paragraph>

      <img alt="Present" src={present} />
      <Flex justifyContent="center">
        <Button onClick={() => navigate('/profil')}>Till ditt CV</Button>
      </Flex>
    </Background>
  )
}

export default RegistrationCompleted
