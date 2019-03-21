import React, { createContext, useReducer } from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './pages/restricted'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
const Login = React.lazy(() => import(`./pages/Login/Login`))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Login path="/" />
        <RestrictedRoute component={Profile} path="/profile" />
      </Router>
    </React.Suspense>
  )
}

export default App
