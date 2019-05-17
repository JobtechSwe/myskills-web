import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from '../../components/Layout/ProfileLayout'

const Home: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  return (
    <ProfileLayout currentPath={location.pathname}>
      <div style={{ width: '100%', height: '1000px', background: 'lightgrey' }}>
        Profil
      </div>
    </ProfileLayout>
  )
}

export default Home
