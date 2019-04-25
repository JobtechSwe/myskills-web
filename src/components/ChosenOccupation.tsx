import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_OCCUPATIONS_CLIENT } from '../graphql/resolvers/mutations/addOccupation'
import { OntologyConceptResponse } from '../generated/myskills'

const ChosenOccupations: React.FC = () => {
  const { data, loading, error } = useQuery(GET_OCCUPATIONS_CLIENT)

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      Dina valda yrken:
      {data.occupations.map((occupation: OntologyConceptResponse) => (
        <p key={occupation.id}>{occupation.term}</p>
      ))}
    </div>
  )
}

export default ChosenOccupations
