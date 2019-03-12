import React from 'react'
import gql from 'graphql-tag'
import { Subscription, Mutation } from 'react-apollo'
import QR from '../../components/QR/QR'
import { RouteComponentProps, navigate } from '@reach/router'
import { setCookie } from '../../utils/helpers'
import styled from '@emotion/styled'

const Test = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.lassekongo};
`

const LoginButton = styled.button`
  width: 100px;
  height: 50px;
  font-size: 24px;
`

const GET_CONSENT_ID = gql`
  mutation login {
    login {
      id
      expires
    }
  }
`
const CONSENT_SUBSCRIPTION = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`

interface IConsentApprovedSubscriptionProps {
  consentRequestId: string
}

const ConsentApprovedSubscription: React.FC<
  IConsentApprovedSubscriptionProps
> = ({ consentRequestId }) => (
  <Subscription
    subscription={CONSENT_SUBSCRIPTION}
    variables={{ consentRequestId }}
  >
    {({ data, loading }) => {
      if (loading || !data) {
        return <p>Waiting for consent...</p>
      }

      setCookie('token', data.consentApproved.accessToken)
      navigate('/profile')
      return null
    }}
  </Subscription>
)

const Login: React.FC<RouteComponentProps> = props => {
  return (
    <Test>
      <Mutation mutation={GET_CONSENT_ID}>
        {(login, { loading, data }) => {
          return (
            <>
              <LoginButton onClick={() => login()}>LOGIN</LoginButton>

              {!loading && data && (
                <>
                  <ConsentApprovedSubscription
                    consentRequestId={data.login.id}
                  />
                  <QR consentId={data.login.id} />
                  <p>{data.login.id}</p>
                </>
              )}
            </>
          )
        }}
      </Mutation>
    </Test>
  )
}

export default Login
