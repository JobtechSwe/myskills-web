import React from 'react'
import gql from 'graphql-tag'
import { useSubscription } from 'react-apollo-hooks'
import { Paragraph } from '../../components/Typography'
import QR from '../../components/QR'
import { OpenInApp } from '../../components/ButtonLink'
import { navigate } from '@reach/router'
import { setCookie } from '../../utils/helpers'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { log } from 'util'

export const CONSENT_SUBSCRIPTION = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`
export const GET_SKILLS = gql`
  query skills @client {
    skills {
      term
    }
  }
`
const SAVE_IN_API = gql`
  mutation saveCV($cv: CVInput!) {
    saveCV(cv: $cv) {
      skills {
        term
      }
    }
  }
`

interface IConsentProps {
  consentId: string
  url: string
  action?: any
}

const Consent: React.FC<IConsentProps> = ({ action, consentId, url }) => {
  const { data, error, loading } = useSubscription(CONSENT_SUBSCRIPTION, {
    variables: {
      consentRequestId: consentId,
    },
  })
  let { skills } = useQuery(GET_SKILLS).data
  skills = skills.map((s: any) => ({
    term: s.term,
    type: 'skill',
    sourceId: '1234151412',
  }))

  const renderConsentStatus = () => {
    const saveInAPIMutation = useMutation(SAVE_IN_API)

    if (loading) {
      return <Paragraph>Waiting for consent...</Paragraph>
    }

    if (error) {
      return <Paragraph>That is an error...</Paragraph>
    }

    if (data) {
      setCookie('token', data.consentApproved.accessToken)
      if (action) {
        saveInAPIMutation({
          variables: {
            cv: {
              skills,
            },
          },
        })
      }
      navigate('/profile')
      return null
    }
  }

  return (
    <>
      {renderConsentStatus()}
      <QR consentId={url} />
      <Paragraph>{url}</Paragraph>
      <OpenInApp url={url} />
    </>
  )
}

export default Consent
