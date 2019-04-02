import React from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './pages/restricted'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import styled from '@emotion/styled'
const Login = React.lazy(() => import(`./pages/Login/Login`))
const Start = React.lazy(() => import(`./pages/Start/Start`))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))
const CreateProfile = React.lazy(() =>
  import('./pages/CreateProfile/CreateProfile')
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
          <CreateProfile path="skapa-cv" />
          <RestrictedRoute component={Profile} path="/profile" />
        </Router>
      </React.Suspense>
      <Footer />
    </Layout>
  )
}

export default App
