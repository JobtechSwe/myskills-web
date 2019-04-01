import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import Consent from './Consent'

const Test = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.lassekongo};
`

export const GET_CONSENT_ID = gql`
  mutation login {
    login {
      id
      expires
    }
  }
`

const Login: React.FC<RouteComponentProps> = props => {
  return (
    <Test>
      {/* TODO(@all):
       *  Replace this with useMutation when support has been added:
       *  https://github.com/trojanowski/react-apollo-hooks/pull/93
       */}
      <Mutation mutation={GET_CONSENT_ID}>
        {(login, { data, error, loading }) => {
          if (loading) {
            return <p>Loading...</p>
          }

          if (error) {
            return <p>That’s an error.</p>
          }

          if (data) {
            return <Consent consentId={data.login.id} />
          }

          return <button onClick={_e => login()}>LOGIN</button>
        }}
      </Mutation>
    </Test>
  )
}

export default Login
