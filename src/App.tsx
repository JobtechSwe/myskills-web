import React from 'react'
import { Router } from '@reach/router'
const Login = React.lazy(() => import('./pages/Login/Login'))

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Login path="/" />
      </Router>
    </React.Suspense>
  )
}

export default App
