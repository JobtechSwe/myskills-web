import React from 'react'
// import gql from 'graphql-tag'
import { RouteComponentProps } from '@reach/router'
// import Consent from './Consent'
import Flex from '../../components/Flex'
// import { useMutation } from 'react-apollo-hooks'
// import { setCookie } from '../../utils/helpers'
// import { navigate } from '@reach/router'

// export const GET_CONSENT_ID = gql`
//   mutation consent {
//     consent {
//       id
//       expires
//       url
//     }
//   }
// `

const Register: React.FC<RouteComponentProps> = props => {
  // const registerMutation = useMutation(GET_CONSENT_ID)
  // const [consent, setConsent] = useState(null)

  // useEffect(() => {
  //   registerMutation().then(({ data: { consent } }) => {
  //     setConsent(consent)
  //   })
  // }, [])

  // const onConsentApproved = (data: any) => {
  //   setCookie('token', data.consentApproved.accessToken)
  //   navigate('/profile')
  // }

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      m={32}
    >
      {/* <>
        Registrera consent
        {consent && (
          <Consent
            onConsentApproved={onConsentApproved}
            consentId={consent.id}
            url={consent.url}
          />
        )}
      </> */}
    </Flex>
  )
}

export default Register
