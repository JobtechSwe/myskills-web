import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_EDUCATIONS_CLIENT } from '../graphql/resolvers/mutations/addEducation'
import { Education } from '../generated/myskills'

const AddedEducations: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EDUCATIONS_CLIENT)

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      {data.educations.map((education: Education, i: number) => (
        <div key={i}>
          <p>{education.programme}</p>
          <p>
            {education.school} | {education.start} - {education.end}
          </p>
        </div>
      ))}
    </div>
  )
}

export default AddedEducations
