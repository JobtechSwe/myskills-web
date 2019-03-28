import React, { useContext } from 'react'
import { Context } from '../../components/ContextProvider/ContextProvider'
import { Flex } from '../../components/Flex/Flex'
import { RouteComponentProps, Link } from '@reach/router'

const Start: React.FC<RouteComponentProps> = () => {
  const {
    state: { logoActive },
    dispatch,
  } = useContext(Context)

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/skapa-cv">Skapa Cv</Link>
      </div>
    </Flex>
  )
}

export default Start
