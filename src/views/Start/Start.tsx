import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, Link } from '@reach/router'
import Button from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'

const Start: React.FC<RouteComponentProps> = () => {
  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <Flex p={32}>
        <Link to="/skapa-cv">
          <Button variant="secondary">Skapa Cv</Button>
        </Link>
      </Flex>
      <Flex alignItems="center" flexDirection="column">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Flex>
    </Flex>
  )
}

export default Start
