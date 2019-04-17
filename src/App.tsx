import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
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

const WhoAmI = React.lazy(() => import(`./views/CreateProfile/WhoAmI`))

const AddTraits = React.lazy(() => import(`./views/CreateProfile/AddTraits`))

const Layout = styled.main`
  background: dodgerblue;
  min-height: 100vh;
`

function App() {
  return (
    <Layout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Start path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddExperience path="/" />
            <WhoAmI path="/beskriv-dig" />
            <AddTraits path="/egenskaper" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </Layout>
  )
}

export default App
