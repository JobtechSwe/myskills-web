import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import Consent from './Consent'
import Button from '../../components/Button'
import Flex from '../../components/Flex'
import { Paragraph } from '../../components/Typography'

export const GET_CONSENT_ID = gql`
  mutation consent {
    consent {
      id
      expires
      url
    }
  }
`

const Register: React.FC<RouteComponentProps> = props => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      m={32}
    >
      {/* TODO(@all):
       *  Replace this with useMutation when support has been added:
       *  https://github.com/trojanowski/react-apollo-hooks/pull/93
       */}
      <Mutation mutation={GET_CONSENT_ID}>
        {(consent, { data, error, loading }) => {
          if (loading) {
            return <Paragraph>Loading...</Paragraph>
          }

          if (error) {
            return <Paragraph>That’s an error.</Paragraph>
          }

          if (data) {
            return (
              <Consent consentId={data.consent.id} url={data.consent.url} />
            )
          }

          return (
            <Button onClick={(_e: any) => consent()} variant="secondary">
              Register
            </Button>
          )
        }}
      </Mutation>
    </Flex>
  )
}

export default Register
