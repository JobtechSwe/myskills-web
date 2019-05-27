import React from 'react'
import { RouteComponentProps } from '@reach/router'
import gql from 'graphql-tag'
import Loader from 'components/Loader'
import Trivia from 'components/Trivia'
import { useQuery } from 'react-apollo-hooks'
import { QueryTriviaArgs, Query } from 'generated/myskills.d'

export const GET_TRIVIA = gql`
  query trivia($occupation: String!) {
    trivia(occupation: $occupation) {
      info
      source
    }
  }
`

const OccupationTrivia: React.FC<RouteComponentProps> = () => {
  const {
    data: { trivia },
    loading,
  } = useQuery<
    {
      trivia: Query['trivia']
    },
    QueryTriviaArgs
  >(GET_TRIVIA, {
    variables: {
      occupation: 'Systemutvecklare',
    },
  })

  if (loading) {
    return <Loader />
  }

  return (
    <Trivia info={trivia.info} source={trivia.source} title="Visste du att?" />
  )
}

export default OccupationTrivia
