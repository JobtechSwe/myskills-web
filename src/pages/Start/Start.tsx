import React, { useContext } from 'react'
import { Context } from '../../Context'
import { RouteComponentProps, Link } from '@reach/router'
import styled from '@emotion/styled'

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
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/skapa-cv">Skapa Cv</Link>
      </div>
    </Wrapper>
  )
}

export default Start
