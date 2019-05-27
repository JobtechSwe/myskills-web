import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import Button from '../../components/Button'
import { Paragraph } from '../../components/Typography'
import LoginView from './LoginView'

export const GET_LOGIN_ID = gql`
  mutation login {
    login {
      url
      sessionId
    }
  }
`

const Login: React.FC<RouteComponentProps> = () => {
  return (
    <>
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
            return <LoginView loginUrl={data.login.url} />
          }

          return (
            <Button onClick={(_e: any) => login()} variant="primary">
              Login
            </Button>
          )
        }}
      </Mutation>
    </>
  )
}

export default Login
