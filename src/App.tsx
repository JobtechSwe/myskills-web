import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
import Loader from './components/Loader'

const Login = React.lazy(() => import(`./views/Login/Login`))
const Start = React.lazy(() => import(`./views/Start/Start`))
const Profile = React.lazy(() => import('./views/Profile/Profile'))

const Congratulations = React.lazy(() =>
  import('./views/CreateProfile/Congratulations')
)

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
const AddContactInformation = React.lazy(() =>
  import(`./views/CreateProfile/AddContactInformation`)
)

const PreviousOccupationExperience = React.lazy(() =>
  import('./views/CreateProfile/PreviousOccupationExperience')
)

const SaveCV = React.lazy(() => import('./views/CreateProfile/SaveCV'))

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
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddEducation path="/utbildning" />
            <ChooseProfession path="/" />
            <Congratulations path="/congratulations" />
            <MatchCompetences path="/kompetenser" />
            <WhoAmI path="/beskriv-dig" />
            <AddTraits path="/egenskaper" />
            <PreviousOccupationExperience path="/erfarenheter" />
            <WorkExperiences path="/erfarenheter/tidigare-erfarenheter" />
            <AddContactInformation path="/kontakt" />
            <SaveCV path="/spara-cv" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
    </>
  )
}

export default App
