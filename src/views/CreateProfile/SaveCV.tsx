import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import Consent from '../Register/Consent'
import Flex from '../../components/Flex'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { setCookie } from '../../utils/helpers'
import { navigate } from '@reach/router'
import { ConsentApprovedSubscription } from '../../generated/myskills'
import styled from '@emotion/styled'
import { OpenInApp } from '../../components/ButtonLink'

export const GET_CONSENT_ID = gql`
  mutation consent {
    consent {
      id
      expires
      url
    }
  }
`

export const SAVE_CV = gql`
  mutation saveCV(
    $skills: [SkillInput!]
    $educations: [EducationInput!]
    $experiences: [ExperienceInput!]
  ) {
    saveCV(
      cv: { skills: $skills, education: $educations, experience: $experiences }
    ) {
      skills {
        sourceId
        term
        type
      }
      education {
        id
        programme
        school
        start
        end
      }
      experience {
        sourceId
        term
        employer
        start
        end
      }
    }
  }
`

export const GET_LOCAL_CV = gql`
  query getCV {
    skills @client {
      sourceId
      term
      type
    }

    educations @client {
      id
      programme
      school
      start
      end
    }

    traits @client

    occupation @client {
      term
      experience {
        years
      }
    }
  }
`

const Background = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => `radial-gradient(
  647.69px at 6.66% 96.53%,
  ${theme.colors.yourPink} 0%,
  ${theme.colors.seashellPeach} 100%
)`};
  flex-direction: column;
  height: 100vh;
  padding: 25px;
  text-align: center;
  color: ${({ theme }) => theme.colors.persianBlue};
  justify-content: center;
`

const QrWrapper = styled.div`
  padding: 20px;
  background: white;
  border-radius: 7px;
`

const Register: React.FC<RouteComponentProps> = props => {
  const registerMutation = useMutation(GET_CONSENT_ID)
  const saveCVMutation = useMutation(SAVE_CV)
  const { data: localCV, loading, error } = useQuery(GET_LOCAL_CV)
  const [consent, setConsent] = useState(null)

  useEffect(() => {
    registerMutation().then(({ data: { consent } }) => {
      setConsent(consent)
    })
  }, [])

  const onConsentApproved = async ({
    consentApproved,
  }: ConsentApprovedSubscription) => {
    console.log('consentapprove', consentApproved)
    console.log('data', localCV)
    setCookie('token', consentApproved.accessToken)
    await saveCVMutation({
      variables: {
        ...localCV,
        skills: localCV.skills.map((skill: any) => ({
          type: skill.type,
          term: skill.term,
          sourceId: skill.sourceId,
        })),
      },
    })
    navigate('/profile')
  }

  return (
    <Background>
      {consent && (
        <>
          <QrWrapper>
            <Consent
              onConsentApproved={onConsentApproved}
              consentId={consent.id}
              url={consent.url}
            />
          </QrWrapper>
          <OpenInApp url={consent.url} />
        </>
      )}
    </Background>
  )
}

export default Register
