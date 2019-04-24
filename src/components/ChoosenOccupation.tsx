import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_OCCUPATIONS_CLIENT } from '../graphql/resolvers/mutations/addOccupation'

const ChoosenOccupations: React.FC = () => {
  const { data, loading, error } = useQuery(GET_OCCUPATIONS_CLIENT)

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      Dina valda kompetenser:
      {data.occupations.map((occupation: any) => (
        <p key={occupation.id}>{occupation.name}</p>
      ))}
    </div>
  )
}

export default ChoosenOccupations
