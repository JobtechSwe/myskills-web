import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Query, Subscription, Mutation } from 'react-apollo'
import QR from '../../components/QR/QR'
import { RouteComponentProps } from '@reach/router'

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
    {({ data, loading }) =>
      !loading && data ? (
        <h4>New access token: {data.consentApproved.accessToken}</h4>
      ) : (
        <p>Waiting for consent...</p>
      )
    }
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
