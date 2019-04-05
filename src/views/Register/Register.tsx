import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import Consent from './Consent'
import { Flex } from '../../components/Flex'

export const GET_CONSENT_ID = gql`
  mutation consent {
    consent {
      id
      expires
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
            return <p>Loading...</p>
          }

          if (error) {
            return <p>That’s an error.</p>
          }

          if (data) {
            return <Consent consentId={data.consent.id} />
          }

          return <button onClick={_e => consent()}>Register</button>
        }}
      </Mutation>
    </Flex>
  )
}

export default Register
