import React, { useState, useEffect } from 'react'
import { getCookie } from '../utils/helpers'

const Restricted = ({ component: BaseComponent, navigate, ...rest }: any) => {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const checkAuthentication = (name: string) => {
    if (!getCookie('token')) {
      navigate('/')
      return
    }
    return !getCookie('token') ? navigate('/') : setAuthenticated(true)
  }

  useEffect(() => checkAuthentication('token'))

  return isAuthenticated ? <BaseComponent {...rest} /> : <p>not logged in...</p>
}

export default Restricted
