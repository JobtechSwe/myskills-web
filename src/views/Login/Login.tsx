import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import Button from '../../components/Button'
import { Paragraph } from '../../components/Typography'
import EgenData from '../../components/EgenData'
import { navigate } from '@reach/router'
import { setCookie } from '../../utils/helpers'
import { ConsentApprovedSubscription } from 'generated/myskills'
import { useSubscription } from 'react-apollo-hooks'

export const LOGIN_SUBSCRIPTION = gql`
  subscription loginApproved($loginRequestId: String!) {
    loginApproved(loginRequestId: $loginRequestId) {
      accessToken
    }
  }
`

export const GET_LOGIN_ID = gql`
  mutation login {
    login {
      url
      sessionId
    }
  }
`

const Login: React.FC<RouteComponentProps> = () => {
  const onConsentApproved = async ({
    consentApproved,
  }: ConsentApprovedSubscription) => {
    setCookie('token', consentApproved.accessToken)
    navigate('/profil')
  }

  const subscription = (loginRequestId: string) => {
    useSubscription<ConsentApprovedSubscription>(LOGIN_SUBSCRIPTION, {
      variables: {
        loginRequestId,
      },
    })
  }

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
            return (
              <EgenData
                btnText="Logga in med"
                subscription={() => subscription(data.login.sessionId)}
                onConsentApproved={onConsentApproved}
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
    </>
  )
}

export default Login
