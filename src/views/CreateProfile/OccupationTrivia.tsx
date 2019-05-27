import React from 'react'
import {
  Layout,
  Navigation,
  FooterButton,
} from 'components/Layout/Registration'
import { navigate, RouteComponentProps } from '@reach/router'
import Trivia from 'components/Trivia'
import styled from '@emotion/styled'

const TriviaLayout = styled(Layout)`
  background: radial-gradient(
    876.62px at 30.44% 67.66%,
    #202eff 0%,
    #3c479f 61.58%,
    #4c5667 100%
  );
`

const OccupationTrivia: React.FC<RouteComponentProps> = ({ location }) => {
  const handleClick = () => {
    navigate('/skapa-cv/utbildning')
  }

  const { state: trivia } = location

  return (
    <TriviaLayout alignItems="center" gridTemplateRows="auto 1fr">
      <Navigation variant="white" />
      <Trivia
        info={trivia.info}
        source={trivia.source}
        title="Visste du att?"
      />
      <FooterButton
        onClick={handleClick}
        text="Fortsätt"
        variant="secondaryBlack"
      />
    </TriviaLayout>
  )
}

export default OccupationTrivia
