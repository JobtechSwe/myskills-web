import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo-hooks'
import QR from '../../components/QR'
import { ConsentApprovedSubscription } from '../../generated/myskills'

export const CONSENT_SUBSCRIPTION = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`

interface ConsentProps {
  consentId: string
  url: string
  onConsentApproved: (data: ConsentApprovedSubscription) => void
}

const Consent: React.FC<ConsentProps> = ({
  consentId,
  onConsentApproved,
  url,
}) => {
  const { data } = useSubscription<ConsentApprovedSubscription>(
    CONSENT_SUBSCRIPTION,
    {
      variables: {
        consentRequestId: consentId,
      },
    }
  )

  useEffect(() => {
    data && onConsentApproved(data)
  }, [data])

  return <QR consentId={url} />
}

export default Consent
