import React, { FunctionComponent, useState, useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { getCookie } from '../utils/helpers'

interface RestrictedRouteProps extends RouteComponentProps {
  component: FunctionComponent
}

const Restricted: React.FC<RestrictedRouteProps> = ({
  component: RestrictedComponent,
  ...props
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false)

  const checkAuthentication = () =>
    !getCookie('token') ? navigate('/') : setAuthenticated(true)

  useEffect(() => {
    checkAuthentication()
  })

  return isAuthenticated ? <RestrictedComponent {...props} /> : null
}

export default Restricted

// Login flow
//
// 1. user clicks login
// 2. consentrequest made to operator, returns a consentrequestid
// 3. user enters consentrequestid into mydata and accepts, returns accesstoken to subscribing client
// 4. client saves accesstoken as cookie
// 5. client uses wrapper component that checks for cookie on all protected routes and allows access accordingly
