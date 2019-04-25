import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import LoginQR from './LoginQR'
import Button from '../../components/Button'
import Flex from '../../components/Flex'
import { Paragraph } from '../../components/Typography'

export const GET_LOGIN_ID = gql`
  mutation login {
    login {
      url
      sessionId
    }
  }
`

const Login: React.FC<RouteComponentProps> = props => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      m={32}
    >
      {/* TODO(@all):
       *  Replace this with useMutation when support has been added:
       *  https://github.com/trojanowski/react-apollo-hooks/pull/93
       */}
      <Mutation mutation={GET_LOGIN_ID}>
        {(login, { data, error, loading }) => {
          if (loading) {
            return <Paragraph>Loading...</Paragraph>
          }

          if (error) {
            return <Paragraph>That’s an error.</Paragraph>
          }

          if (data) {
            return (
              <LoginQR
                loginRequestId={data.login.sessionId}
                loginUrl={data.login.url}
              />
            )
          }

          return (
            <Button onClick={(_e: any) => login()} variant="primary">
              Login
            </Button>
          )
        }}
      </Mutation>
    </Flex>
  )
}

export default Login
