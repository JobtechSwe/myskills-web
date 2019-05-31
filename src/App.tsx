import React from 'react'
import { Location, Router } from '@reach/router'
import RestrictedRoute from 'views/restricted'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './fade.css'
import Login from 'views/Login/Login'
import Start from 'views/Start/Start'
import NotFound from 'views/NotFound'
import Profile from 'views/Profile/Profile'
import RegistrationCompleted from 'views/CreateProfile/RegistrationCompleted'
import CreateProfile from 'views/CreateProfile/CreateProfile'
import ChooseProfession from 'views/CreateProfile/ChooseProfession'
import MatchCompetences from 'views/CreateProfile/AddSkills'
import AddEducation from 'views/CreateProfile/AddEducation'
import AddContactInformation from 'views/CreateProfile/AddContactInformation'
import PreviousOccupationExperience from 'views/CreateProfile/PreviousOccupationExperience'
import OccupationTrivia from 'views/CreateProfile/OccupationTrivia'
import SaveCV from 'views/CreateProfile/SaveCV'
import WorkExperiences from 'views/CreateProfile/WorkExperiences'
import UploadImage from 'views/CreateProfile/UploadImage'
import WhoAmI from 'views/CreateProfile/WhoAmI'
import AddTraits from 'views/CreateProfile/AddTraits'
import Home from 'views/Profile/Home'
import Timeline from 'views/Profile/Timeline'
import UpdateEducation from 'views/Profile/UpdateEducation'
import UpdateWorkExperience from 'views/Profile/UpdateWorkExperiences'
import UpdateWhoAmI from 'views/Profile/UpdatePersonalDescription'
import UpdateSkills from 'views/Profile/UpdateSkills'

function App() {
  return (
    <>
      <Location>
        {({ location }) => (
          <TransitionGroup>
            <CSSTransition
              classNames="fadeTranslate"
              key={location.key}
              timeout={1000}
            >
              <Router location={location}>
                <Start path="/" />
                <Login path="/logga-in" />
                <CreateProfile path="/skapa-cv">
                  <AddContactInformation path="/kontakt" />
                  <AddEducation path="/utbildning" />
                  <AddTraits path="/egenskaper" />
                  <ChooseProfession path="/" />
                  <MatchCompetences path="/kompetenser" />
                  <OccupationTrivia path="/visste-du-att" />
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
                  <RestrictedRoute
                    component={UpdateEducation}
                    path="/utbildning"
                  />
                  <RestrictedRoute
                    component={UpdateWhoAmI}
                    path="/beskriv-dig"
                  />
                  <RestrictedRoute
                    component={UpdateWorkExperience}
                    path="/erfarenheter"
                  />
                  <RestrictedRoute
                    component={UpdateSkills}
                    path="/kompetenser"
                  />
                  <NotFound default />
                </Profile>

                <NotFound default />
              </Router>
            </CSSTransition>
          </TransitionGroup>
        )}
      </Location>
    </>
  )
}

export default App
