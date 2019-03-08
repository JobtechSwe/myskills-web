import * as React from 'react'
import gql from 'graphql-tag'
import { Query, Subscription } from 'react-apollo'
import QR from '../../components/QR/QR'
import { RouteComponentProps } from '@reach/router'

export const GET_CONSENT_ID = gql`
  query GetConsentId {
    consent {
      id
      expires
    }
  }
`
const CONSENT_SUBSCRIPTION = gql`
  subscription onCommentAdded($consent: String!) {
    consentResponse(consent: $consent) {
      accessToken
    }
  }
`

const AccessToken = ({ consentId }: any) => (
  <Subscription subscription={CONSENT_SUBSCRIPTION} variables={{ consentId }}>
    {({ data: { accessToken }, loading }) => (
      <h4>New access token: {!loading && accessToken}</h4>
    )}
  </Subscription>
)

const Login: React.FC<RouteComponentProps> = () => {
  return (
    <Query query={GET_CONSENT_ID}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return (
          <>
            {/* <AccessToken consentId={data.consent.id} /> */}
            <QR consentId={data.consent.id} />
            <p>{data.consent.id}</p>
          </>
        )
      }}
    </Query>
  )
}

export default Login
