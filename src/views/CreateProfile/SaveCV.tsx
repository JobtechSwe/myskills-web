import React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
import Grid from 'components/Grid'
import { useMutation, useQuery, useSubscription } from 'react-apollo-hooks'
import { setCookie } from 'utils/helpers'
import { navigate } from '@reach/router'
import { ConsentApprovedSubscription } from 'generated/myskills'
import styled from '@emotion/styled'
import { Paragraph } from 'components/Typography'
import Loader from 'components/Loader'
import EgenData from 'components/EgenData'

export const GET_CONSENT_ID = gql`
  query consent {
    consent {
      id
      url
    }
  }
`

export const CONSENT_SUBSCRIPTION = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`

export function removeTypename(prop: any): any {
  if (typeof prop === 'string') {
    return prop
  }
  return Object.keys(prop).reduce((acc, key) => {
    let withoutTypename
    if (key === '__typename') {
      return acc
    }
    if (Array.isArray(prop[key])) {
      withoutTypename = prop[key].map(removeTypename)
    } else if (prop[key] && typeof prop[key] === 'object') {
      withoutTypename = removeTypename(prop[key])
    }
    return {
      ...acc,
      [key]: withoutTypename || prop[key],
    }
  }, {})
}

export const SAVE_CV = gql`
  mutation saveCV(
    $educations: [EducationInput!]
    $experiences: [ExperienceInput!]
    $image: ImgInput
    $occupation: OccupationInput
    $personalDescription: String
    $skills: [SkillInput!]
    $traits: [String!]
    $profile: ProfileInput
  ) {
    saveCV(
      cv: {
        educations: $educations
        experiences: $experiences
        image: $image
        occupation: $occupation
        personalDescription: $personalDescription
        skills: $skills
        traits: $traits
        profile: $profile
      }
    ) {
      skills {
        sourceId
      }
    }
  }
`

export const GET_CV_CLIENT = gql`
  query getCvClient {
    skills @client {
      sourceId
      term
      type
    }

    experiences {
      employer
      start
      end
      sourceId
      term
    }

    educations @client {
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

    profile @client {
      name
      email
      telephone
    }

    whoAmI @client
    image @client(always: true)
  }
`

const Background = styled(Grid)`
  background: ${({ theme }) => `radial-gradient(
  647.69px at 6.66% 96.53%,
  ${theme.colors.yourPink} 0%,
  ${theme.colors.seashellPeach} 100%
)`};
  height: 100vh;
`

const Register: React.FC<RouteComponentProps> = () => {
  const {
    data: { consent },
    loading,
    error,
  } = useQuery(GET_CONSENT_ID)

  const saveCVMutation = useMutation(SAVE_CV)
  const { data: localCV } = useQuery(GET_CV_CLIENT)

  const subscription = useSubscription<ConsentApprovedSubscription>(
    CONSENT_SUBSCRIPTION,
    {
      variables: {
        consentRequestId: consent.id,
      },
    }
  )

  const onConsentApproved = async ({
    consentApproved,
  }: ConsentApprovedSubscription) => {
    const localCVWithoutTypename = removeTypename(localCV)

    setCookie('token', consentApproved.accessToken)
    await saveCVMutation({
      variables: {
        ...localCVWithoutTypename,
        image: {
          imageString: localCVWithoutTypename.image,
        },
        personalDescription: localCV.whoAmI,
        skills: localCV.skills.map((skill: any) => ({
          type: skill.type,
          term: skill.term,
          sourceId: skill.sourceId,
        })),
      },
    })
    navigate('/skapa-cv/grattis')
  }

  return (
    <Background alignItems="center" justifyContent="center">
      {error && <Paragraph>{error.message}</Paragraph>}
      {loading && <Loader />}
      {consent && (
        <EgenData
          subscription={subscription}
          onConsentApproved={onConsentApproved}
          btnText="Spara CV med"
          loginUrl={consent.url}
        />
      )}
    </Background>
  )
}

export default Register
