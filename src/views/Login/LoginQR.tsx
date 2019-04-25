import React from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo-hooks'
import QR from '../../components/QR'
import { OpenInApp } from '../../components/ButtonLink'
import { Paragraph } from '../../components/Typography'
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
      return <Paragraph>Waiting for login approval...</Paragraph>
    }

    if (error) {
      return <Paragraph>That is an error...</Paragraph>
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
      <Paragraph id="consentId">{loginUrl}</Paragraph>
      <OpenInApp url={loginUrl} />
    </>
  )
}

export default LoginQR
