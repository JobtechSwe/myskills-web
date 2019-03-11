import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './pages/restricted'

const Login = React.lazy(() => import('./pages/Login/Login'))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Login path="/" />

        <RestrictedRoute component={Profile} path="/profile" />
        <Profile path="/profile" />
      </Router>
    </React.Suspense>
  )
}

export default App
