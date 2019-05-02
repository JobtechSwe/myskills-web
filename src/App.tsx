import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
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
const AddEducation = React.lazy(() =>
  import('./views/CreateProfile/AddEducation')
)

const PreviousExperience = React.lazy(() =>
  import('./views/CreateProfile/PreviousExperience')
)

const WorkExperiences = React.lazy(() =>
  import('./views/CreateProfile/WorkExperiences')
)

const WhoAmI = React.lazy(() => import(`./views/CreateProfile/WhoAmI`))

const AddTraits = React.lazy(() => import(`./views/CreateProfile/AddTraits`))

function App() {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <Router>
          <Start path="/" />
          <Register path="/register" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddEducation path="/utbildning" />
            <ChooseProfession path="/" />
            <MatchCompetences path="/kompetenser" />
            <WhoAmI path="/beskriv-dig" />
            <AddTraits path="/egenskaper" />
            <PreviousExperience path="/erfarenheter" />
            <WorkExperiences path="/erfarenheter/tidigare-erfarenheter" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </>
  )
}

export default App
