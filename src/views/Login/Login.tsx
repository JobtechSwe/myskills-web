import React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import EgenData from '../../components/EgenData'
import { navigate } from '@reach/router'
import { setCookie } from '../../utils/helpers'
import { ConsentApprovedSubscription, LoginQuery } from 'generated/myskills'
import { useQuery } from 'react-apollo-hooks'
import Loader from 'components/Loader'
export const LOGIN_SUBSCRIPTION = gql`
  subscription loginSubscription($loginRequestId: String!) {
    loginApproved(loginRequestId: $loginRequestId) {
      accessToken
    }
  }
`

export const GET_LOGIN_ID = gql`
  query login {
    getLoginUrl {
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
  const {
    data: { getLoginUrl },
    loading,
  } = useQuery<LoginQuery>(GET_LOGIN_ID)
  return (
    <>
      {loading && <Loader />}
      {!loading && getLoginUrl && (
        <EgenData
          btnText="Logga in med"
          consentId={getLoginUrl.sessionId}
          isLogin
          loginUrl={getLoginUrl.url}
          onConsentApproved={onConsentApproved}
        />
      )}
    </>
  )
}

export default Login
