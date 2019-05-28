import React from 'react'
import { Global } from '@emotion/core'
import { routeTransitionStyles } from 'theme/globalStyle'
import { Location, Router } from '@reach/router'
import RestrictedRoute from 'views/restricted'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* General */
import Login from 'views/Login/Login'
import Start from 'views/Start/Start'
import NotFound from 'views/NotFound'

/* Create Profile */
import CreateProfile from 'views/CreateProfile/CreateProfile'
import AddContactInformation from 'views/CreateProfile/AddContactInformation'
import AddEducation from 'views/CreateProfile/AddEducation'
import AddTraits from 'views/CreateProfile/AddTraits'
import ChooseProfession from 'views/CreateProfile/ChooseProfession'
import MatchCompetences from 'views/CreateProfile/AddSkills'
import OccupationTrivia from 'views/CreateProfile/OccupationTrivia'
import PreviousOccupationExperience from 'views/CreateProfile/PreviousOccupationExperience'
import RegistrationCompleted from 'views/CreateProfile/RegistrationCompleted'
import SaveCV from 'views/CreateProfile/SaveCV'
import UploadImage from 'views/CreateProfile/UploadImage'
import WhoAmI from 'views/CreateProfile/WhoAmI'
import WorkExperiences from 'views/CreateProfile/WorkExperiences'

/* Profile */
import Profile from 'views/Profile/Profile'
import Home from 'views/Profile/Home'
import Timeline from 'views/Profile/Timeline'
import UpdateEducation from 'views/Profile/UpdateEducation'
import UpdateWhoAmI from 'views/Profile/UpdatePersonalDescription'
import UpdateWorkExperience from 'views/Profile/UpdateWorkExperiences'

function App() {
  return (
    <>
      <Global styles={routeTransitionStyles} />
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
