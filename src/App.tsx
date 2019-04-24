import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
import Header from './components/Header'
import { Paragraph } from './components/Typography'
import styled from '@emotion/styled'
const Register = React.lazy(() => import(`./views/Register/Register`))
const Login = React.lazy(() => import(`./views/Login/Login`))
const Start = React.lazy(() => import(`./views/Start/Start`))
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const CreateProfile = React.lazy(() =>
  import('./views/CreateProfile/CreateProfile')
)
const AddExperience = React.lazy(() =>
  import(`./views/CreateProfile/AddExperience`)
)
const AddEducation = React.lazy(() =>
  import(`./views/CreateProfile/AddEducation`)
)

function App() {
  return (
    <>
      <Header />
      <React.Suspense fallback={<Paragraph>Loading...</Paragraph>}>
        <Router>
          <Start path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddExperience path="/erfarenhet" />
            <AddEducation path="/utbildning" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </>
  )
}

export default App
