import React from 'react'
import gql from 'graphql-tag'
import { Subscription, Mutation } from 'react-apollo'
import QR from '../../components/QR/QR'
import { RouteComponentProps } from '@reach/router'
import { setCookie } from '../../utils/helpers'

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

interface ConsentApprovedSubscriptionProps {
  consentRequestId: string
}

const ConsentApprovedSubscription: React.FC<
  ConsentApprovedSubscriptionProps
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
    }}
  </Subscription>
)

const Login: React.FC<RouteComponentProps> = () => (
  <Mutation mutation={GET_CONSENT_ID}>
    {(login, { loading, data }) => (
      <>
        <button onClick={() => login()}>Login</button>
        {!loading && data && (
          <>
            <ConsentApprovedSubscription consentRequestId={data.login.id} />
            <QR consentId={data.login.id} />
            <p>{data.login.id}</p>
          </>
        )}
      </>
    )}
  </Mutation>
)

export default Login
