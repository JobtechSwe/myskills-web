import React from 'react'
import { Router } from '@reach/router'

const Login = React.lazy(() => import('./pages/Login/Login'))

function App() {
  return (
    <Router>
      <Login path="/" />
    </Router>
  )
}

export default App
