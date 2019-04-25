import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
import styled from '@emotion/styled'
import Loader from './components/Loader'

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
const MatchCompetences = React.lazy(() =>
  import('./views/CreateProfile/MatchSkills')
)

const WhoAmI = React.lazy(() => import(`./views/CreateProfile/WhoAmI`))

const AddTraits = React.lazy(() => import(`./views/CreateProfile/AddTraits`))

const Layout = styled.main`
  background: white;
  min-height: 100vh;
`

function App() {
  return (
    <Layout>
      <React.Suspense fallback={<Loader />}>
        <Router>
          <Start path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <ChooseProfession path="/" />
            <MatchCompetences path="/kompetenser" />
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
