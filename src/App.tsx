import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './views/restricted'
import Header from './components/Header'
import Footer from './components/Footer'
import styled from '@emotion/styled'
const Login = React.lazy(() => import(`./views/Login/Login`))
const Start = React.lazy(() => import(`./views/Start/Start`))
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const CreateProfile = React.lazy(() =>
  import('./views/CreateProfile/CreateProfile')
)
const AddExperience = React.lazy(() =>
  import(`./views/CreateProfile/AddExperience`)
)

const Layout = styled.main`
  background: dodgerblue;
  min-height: 100vh;
`

function App() {
  return (
    <Layout>
      <Header />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Start path="/" />
          <Login path="/login" />
          <CreateProfile path="/skapa-cv">
            <AddExperience path="/" />
          </CreateProfile>
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
      <Footer />
    </Layout>
  )
}

export default App
