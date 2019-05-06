import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_OCCUPATION_CLIENT } from '../graphql/resolvers/mutations/createOccupation'

const ChosenOccupation: React.FC = () => {
  const { data, loading, error } = useQuery(GET_OCCUPATION_CLIENT)

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      Ditt valda yrke:
      {data.occuaption && <p>{data.occupation.term}</p>}
    </div>
  )
}

export default ChosenOccupation
