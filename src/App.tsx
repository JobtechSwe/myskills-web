import React, { createContext, useReducer } from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './pages/restricted'
import Header from './components/Header/Header'
const Login = React.lazy(() => import(`./pages/Login/Login`))
const Start = React.lazy(() => import(`./pages/Start/Start`))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))
const CreateProfile = React.lazy(() =>
  import('./pages/CreateProfile/CreateProfile')
)

function App() {
  return (
    <>
      <Header />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Start path="/" />
          <Login path="/login" />
          <CreateProfile path="skapa-cv" />
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </>
  )
}

export default App
