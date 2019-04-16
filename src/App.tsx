import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
import Header from './components/Header'
import styled from '@emotion/styled'
const Register = React.lazy(() => import(`./views/Register/Register`))
const Login = React.lazy(() => import(`./views/Login/Login`))
const Start = React.lazy(() => import(`./views/Start/Start`))
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const CreateProfile = React.lazy(() =>
  import('./views/CreateProfile/CreateProfile')
)
const ChooseProfession = React.lazy(() =>
  import(`./views/CreateProfile/ChooseProfession`)
)

const Layout = styled.main`
  background: white;
  min-height: 100vh;
`

function App() {
  return (
    <Layout>
      <Header />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Start path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <ChooseProfession path="/" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </Layout>
  )
}

export default App
