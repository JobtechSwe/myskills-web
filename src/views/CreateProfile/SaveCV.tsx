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
import Loader from '../../components/Loader'

export const GET_CONSENT_ID = gql`
  query consent {
    consent {
      id
      url
    }
  }
`

function removeTypename(obj: any): any {
  return Object.keys(obj).reduce((acc, key) => {
    let withoutTypename
    if (key === '__typename') {
      return acc
    }
    if (Array.isArray(obj[key])) {
      withoutTypename = obj[key].map(removeTypename)
    } else if (obj[key] && typeof obj[key] === 'object') {
      withoutTypename = removeTypename(obj[key])
    }
    return {
      ...acc,
      [key]: withoutTypename || obj[key],
    }
  }, {})
}

export const SAVE_CV = gql`
  mutation saveCV(
    $skills: [SkillInput!]
    $educations: [EducationInput!]
    $experiences: [ExperienceInput!]
    $occupation: OccupationInput
  ) {
    saveCV(
      cv: {
        skills: $skills
        educations: $educations
        experiences: $experiences
        occupation: $occupation
      }
    ) {
      skills {
        sourceId
      }
    }
  }
`

export const GET_CV_CLIENT = gql`
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
    languages
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
  const {
    data: { consent },
    loading,
    error,
  } = useQuery(GET_CONSENT_ID)

  const saveCVMutation = useMutation(SAVE_CV)
  const { data: localCV } = useQuery(GET_CV_CLIENT)

  const onConsentApproved = async ({
    consentApproved,
  }: ConsentApprovedSubscription) => {
    const localCVWithoutTypename = removeTypename(localCV)
    setCookie('token', consentApproved.accessToken)
    await saveCVMutation({
      variables: {
        ...localCVWithoutTypename,
        skills: localCV.skills.map((skill: any) => ({
          type: skill.type,
          term: skill.term,
          sourceId: skill.sourceId,
        })),
      },
    })
    navigate('/skapa-cv/congratulations')
  }
  if (error) return <div>{error.message}</div>
  if (loading) return <Loader />
  return (
    <Background>
      {consent && (
        <>
          <QrWrapper>
            <Consent
              consentId={consent.id}
              onConsentApproved={onConsentApproved}
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
