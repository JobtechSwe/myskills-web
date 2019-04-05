import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import LoginQR from './LoginQR'
import { Flex } from '../../components/Flex'

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
            return <p>Loading...</p>
          }

          if (error) {
            return <p>That’s an error.</p>
          }

          if (data) {
            return (
              <LoginQR
                loginRequestId={data.login.sessionId}
                loginUrl={data.login.url}
              />
            )
          }

          return <button onClick={_e => login()}>Login</button>
        }}
      </Mutation>
    </Flex>
  )
}

export default Login
