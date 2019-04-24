import React from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps } from '@reach/router'
import Button from '../../components/Button'
import { InternalLink } from '../../components/Link'

const Start: React.FC<RouteComponentProps> = () => {
  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <Flex p={32}>
        <InternalLink to="/skapa-cv">
          <Button variant="primary">Skapa Cv</Button>
        </InternalLink>
      </Flex>
      <Flex alignItems="center" flexDirection="column">
        <InternalLink mb={12} to="/login">
          Login
        </InternalLink>
        <InternalLink to="/register">Register</InternalLink>
      </Flex>
    </Flex>
  )
}

export default Start
