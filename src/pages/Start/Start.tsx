import React, { useContext } from 'react'
import { Context } from '../../components/ContextProvider/ContextProvider'
import { RouteComponentProps, Link } from '@reach/router'
import styled from '@emotion/styled'
import Button from '../../components/Button/Button'

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`

const Start: React.FC<RouteComponentProps> = () => {
  const {
    state: { logoActive },
    dispatch,
  } = useContext(Context)

  return (
    <Wrapper>
      <div>
        <Link to="/skapa-cv">
          <Button text="Skapa Cv" variant="primary" />
        </Link>
      </div>
      <div>
        <Link to="/login">
          <Button text="Login" variant="secondary" />
        </Link>
      </div>
    </Wrapper>
  )
}

export default Start
