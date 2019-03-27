import React from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo-hooks'
import QR from '../../components/QR/QR'
import { navigate } from '@reach/router'
import { setCookie } from '../../utils/helpers'

export const CONSENT_SUBSCRIPTION = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`

interface IConsentProps {
  consentId: string
}

const Consent: React.FC<IConsentProps> = ({ consentId }) => {
  const { data, error, loading } = useSubscription(CONSENT_SUBSCRIPTION, {
    variables: {
      consentRequestId: consentId,
    },
  })

  const renderConsentStatus = () => {
    if (loading) {
      return <p>Waiting for consent...</p>
    }

    if (error) {
      return <p>That is an error...</p>
    }

    if (data) {
      setCookie('token', data.consentApproved.accessToken)
      navigate('/profile')
      return null
    }
  }

  return (
    <>
      {renderConsentStatus()}
      <QR consentId={consentId} />
      <p id="consentId">{consentId}</p>
    </>
  )
}

export default Consent
