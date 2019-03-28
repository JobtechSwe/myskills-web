import React, { useContext } from 'react'
import { Context } from '../../components/ContextProvider/ContextProvider'
import { Flex } from '../../components/Flex/Flex'
import { RouteComponentProps, Link } from '@reach/router'
import Button from '../../components/Button/Button'

const Start: React.FC<RouteComponentProps> = () => {
  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
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
    </Flex>
  )
}

export default Start
