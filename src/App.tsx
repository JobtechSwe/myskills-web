import React, { createContext, useReducer } from 'react'
import { Router } from '@reach/router'
import RestrictedRoute from './pages/restricted'
import gql from 'graphql-tag'

import { useQuery } from 'react-apollo-hooks'
import { Mutation } from 'react-apollo'
const Login = React.lazy(() => import(`./pages/Login/Login`))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))

const GET_USER_AGE = gql`
  query userAge {
    age @client
  }
`

const SET_AGE = gql`
  mutation setAge($val: any) {
    setAge(val: $val) @client
  }
`

function App() {
  const { data } = useQuery(GET_USER_AGE)
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {data.age}

      <Mutation mutation={SET_AGE} variables={{ val: 10 }}>
        {(setAge, { data }) => (
          <button onClick={() => setAge()}>SET AGE TO 10</button>
        )}
      </Mutation>
      <Router>
        <Login path="/" />
        <RestrictedRoute component={Profile} path="/profile" />
      </Router>
    </React.Suspense>
  )
}

export default App
