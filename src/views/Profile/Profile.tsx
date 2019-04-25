import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Paragraph } from '../../components/Typography'

const Profile: React.FC<RouteComponentProps> = props => (
  <Paragraph>Profile page (you are logged in)</Paragraph>
)

export default Profile
