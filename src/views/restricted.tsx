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
  // const [isAuthenticated, setAuthenticated] = useState(false)

  // const checkAuthentication = () =>
  //   !getCookie('token') ? navigate('/') : setAuthenticated(true)

  // useEffect(() => {
  //   checkAuthentication()
  // })
  return <RestrictedComponent {...props} />
  // return isAuthenticated ? <RestrictedComponent {...props} /> : null
}

export default Restricted
