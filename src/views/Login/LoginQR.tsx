import React from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo-hooks'
import QR from '../../components/QR'
import { navigate } from '@reach/router'
import { setCookie } from '../../utils/helpers'

export const LOGIN_SUBSCRIPTION = gql`
  subscription loginApproved($loginRequestId: String!) {
    loginApproved(loginRequestId: $loginRequestId) {
      accessToken
    }
  }
`

interface ILoginQRProps {
  loginUrl: string
  loginRequestId: string
}

const LoginQR: React.FC<ILoginQRProps> = ({ loginRequestId, loginUrl }) => {
  const { data, error, loading } = useSubscription(LOGIN_SUBSCRIPTION, {
    variables: {
      loginRequestId,
    },
  })

  const renderLoginStatus = () => {
    if (loading) {
      return <p>Waiting for login approval...</p>
    }

    if (error) {
      return <p>That is an error...</p>
    }

    if (data) {
      setCookie('token', data.loginApproved.accessToken)
      navigate('/profile')
      return null
    }
  }

  return (
    <>
      {renderLoginStatus()}
      <QR consentId={loginUrl} />
      <p id="consentId">{loginUrl}</p>
    </>
  )
}

export default LoginQR
