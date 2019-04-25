import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_EDUCATIONS_CLIENT } from '../graphql/resolvers/mutations/addEducation'
import { Education } from '../generated/myskills'
import Button from './Button'
import gql from 'graphql-tag'

export const REMOVE_EDUCATIONS_CLIENT = gql`
  mutation removeEducationClient($education: EducationInput!) {
    removeEducationClient(education: $education) @client {
      programme
      school
      start
      end
    }
  }
`

const AddedEducations: React.FC = () => {
  const { data, loading, error } = useQuery(GET_EDUCATIONS_CLIENT)
  const removeEducationClient = useMutation(REMOVE_EDUCATIONS_CLIENT)

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
          <Button
            onClick={() =>
              removeEducationClient({
                variables: {
                  education,
                },
              })
            }
            type="button"
          >
            REMOVE
          </Button>
        </div>
      ))}
    </div>
  )
}

export default AddedEducations
