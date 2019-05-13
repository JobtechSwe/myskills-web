import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Paragraph } from '../../components/Typography'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

export const GET_SKILLS = gql`
  query skills {
    skills {
      term
    }
  }
`
const d = {
  margin: '50px',
  fontWeight: 'bold',
} as React.CSSProperties

const Profile: React.FC<RouteComponentProps> = props => {
  const { data, loading, error } = useQuery(GET_SKILLS)
  if (loading) return <div />
  return (
    <div>
      <h1 style={d}>REGISTRERADE KOMPETENSER</h1>
      {data.skills.map((r: any, i: number) => (
        <Paragraph key={i} style={d}>
          {r.term}
        </Paragraph>
      ))}
    </div>
  )
}

export default Profile
