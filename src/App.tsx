import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
import Header from './components/Header'
import styled from '@emotion/styled'
import Loader from './components/Loader'

const Register = React.lazy(() => import(`./views/Register/Register`))
const Login = React.lazy(() => import(`./views/Login/Login`))
const Start = React.lazy(() => import(`./views/Start/Start`))
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const CreateProfile = React.lazy(() =>
  import('./views/CreateProfile/CreateProfile')
)
const AddOccupations = React.lazy(() =>
  import(`./views/CreateProfile/AddOccupation`)
)
const MatchCompetences = React.lazy(() =>
  import('./views/CreateProfile/MatchCompetences')
)

const Layout = styled.main`
  background: dodgerblue;
  min-height: 100vh;
`

function App() {
  return (
    <Layout>
      <Header />
      <React.Suspense fallback={<Loader />}>
        <Router>
          <Start path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddOccupations path="/" />
            <MatchCompetences path="/kompetenser" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </Layout>
  )
}

export default App
