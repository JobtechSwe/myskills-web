import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from 'views/restricted'
import Loader from 'components/Loader'

const Login = React.lazy(() => import(`views/Login/Login`))
const Start = React.lazy(() => import(`views/Start/Start`))
const NotFound = React.lazy(() => import(`views/NotFound`))
const Profile = React.lazy(() => import('views/Profile/Profile'))
const RegistrationCompleted = React.lazy(() =>
  import('views/CreateProfile/RegistrationCompleted')
)
const CreateProfile = React.lazy(() =>
  import('views/CreateProfile/CreateProfile')
)
const ChooseProfession = React.lazy(() =>
  import('views/CreateProfile/ChooseProfession')
)
const MatchCompetences = React.lazy(() =>
  import('views/CreateProfile/AddSkills')
)
const AddEducation = React.lazy(() =>
  import('views/CreateProfile/AddEducation')
)
const AddContactInformation = React.lazy(() =>
  import('views/CreateProfile/AddContactInformation')
)
const PreviousOccupationExperience = React.lazy(() =>
  import('views/CreateProfile/PreviousOccupationExperience')
)
const SaveCV = React.lazy(() => import('views/CreateProfile/SaveCV'))
const WorkExperiences = React.lazy(() =>
  import('views/CreateProfile/WorkExperiences')
)
const UploadImage = React.lazy(() => import('views/CreateProfile/UploadImage'))
const WhoAmI = React.lazy(() => import('views/CreateProfile/WhoAmI'))
const AddTraits = React.lazy(() => import('views/CreateProfile/AddTraits'))
const Home = React.lazy(() => import('views/Profile/Home'))
const Timeline = React.lazy(() => import('views/Profile/Timeline'))
const UpdateEducation = React.lazy(() =>
  import('views/Profile/UpdateEducation')
)
const UpdateWorkExperience = React.lazy(() =>
  import('views/Profile/UpdateWorkExperiences')
)
const UpdateWhoAmI = React.lazy(() =>
  import('views/Profile/UpdatePersonalDescription')
)

function App() {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <Router>
          <Start path="/" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddContactInformation path="/kontakt" />
            <AddEducation path="/utbildning" />
            <AddTraits path="/egenskaper" />
            <ChooseProfession path="/" />
            <MatchCompetences path="/kompetenser" />
            <PreviousOccupationExperience path="/erfarenheter" />
            <RegistrationCompleted path="/grattis" />
            <SaveCV path="/spara-cv" />
            <UploadImage path="/profilbild" />
            <WhoAmI path="/beskriv-dig" />
            <WorkExperiences path="/erfarenheter/tidigare-erfarenheter" />
            <NotFound default />
          </CreateProfile>
          <Profile path="/profil">
            <RestrictedRoute component={Home} path="/" />
            <RestrictedRoute component={Timeline} path="/tidslinje" />
            <RestrictedRoute component={UpdateEducation} path="/utbildning" />
            <RestrictedRoute component={UpdateWhoAmI} path="/beskriv-dig" />
            <RestrictedRoute
              component={UpdateWorkExperience}
              path="/erfarenheter"
            />
            <NotFound default />
          </Profile>

          <NotFound default />
        </Router>
      </React.Suspense>
    </>
  )
}

export default App
