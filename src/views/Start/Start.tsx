import React from 'react'
import { Flex } from '../../components/Flex'
import { RouteComponentProps, Link } from '@reach/router'
import Button from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'

const Start: React.FC<RouteComponentProps> = () => {
  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <div>
        <Link to="/skapa-cv">
          <Button variant="primary">Skapa Cv</Button>
        </Link>
      </div>
      <Flex alignItems="center" flexDirection="column">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Flex>
      <div>
        <ButtonLink fontSize="small" href="/test">
          This is a button link
        </ButtonLink>
      </div>
    </Flex>
  )
}

export default Start
