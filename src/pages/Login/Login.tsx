import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import QR from '../../components/QR/QR'

const GET_CONSENT_ID = gql`
  query GetConsentId {
    consent {
      id
      expires
    }
  }
`

function Login() {
  return (
    <Query query={GET_CONSENT_ID}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`

        return <QR consentId={data.consent.id} />
      }}
    </Query>
  )
}

export default Login
