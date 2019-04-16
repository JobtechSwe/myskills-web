import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, Link } from '@reach/router'
import Button from '../../components/Button'

const Start: React.FC<RouteComponentProps> = () => {
  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <Flex alignItems="center" flexDirection="column">
        <Link to="/skapa-cv">
          <Button variant="secondary">Skapa Cv</Button>
        </Link>
        <Link to="/login">Logga in</Link>
      </Flex>
    </Flex>
  )
}

export default Start
