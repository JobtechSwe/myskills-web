import React from 'react'
import { RouteComponentProps } from '@reach/router'
import gql from 'graphql-tag'
import Loading from 'components/Loading'
import Trivia from 'components/Trivia'
import { useQuery } from 'react-apollo-hooks'

export const GET_TRIVIA = gql`
  query trivia($occupation: String!) {
    trivia(occupation: $occupation) {
      info
    }
  }
`

const OccupationTrivia: React.FC<RouteComponentProps> = () => {
  const { data, error, loading } = useQuery(GET_TRIVIA)

  return (
    <Trivia
      info="En elefant har en snabel och stora öron"
      source="tom.se"
      title="Visste du att?"
    />
  )
}

export default OccupationTrivia
