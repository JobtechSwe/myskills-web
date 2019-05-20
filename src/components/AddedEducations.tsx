import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_EDUCATIONS_CLIENT } from '../graphql/resolvers/mutations/addEducation'
import { Education } from '../generated/myskills'
import Timeline from './Timeline'

interface AddedEducationsProps {
  editingEntry?: string
  handleEdit?: (entry: any) => void
}

const AddedEducations: React.FC<AddedEducationsProps> = ({
  editingEntry,
  handleEdit,
}) => {
  const { data, loading, error } = useQuery(GET_EDUCATIONS_CLIENT)

  if (error) return <div>{error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      {data && data.educations && (
        <Timeline
          editingEntry={editingEntry}
          entries={data.educations.map((education: Education) => ({
            id: education.id,
            title: education.programme,
            schoolOrCompany: education.school,
            start: education.start,
            end: education.end,
          }))}
          handleEdit={handleEdit}
        />
      )}
    </>
  )
}

export default AddedEducations
