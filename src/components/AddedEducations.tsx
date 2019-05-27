import React from 'react'
import { Education } from 'generated/myskills'
import Timeline from './Timeline'

interface AddedEducationsProps {
  editingEntry?: string
  handleEdit?: (entry: any) => void
  educations: Education[]
}

const AddedEducations: React.FC<AddedEducationsProps> = ({
  educations,
  editingEntry,
  handleEdit,
}) => {
  return (
    <>
      <Timeline
        editingEntry={editingEntry}
        entries={educations.map((education: Education) => ({
          id: education.id,
          title: education.programme,
          schoolOrCompany: education.school,
          start: education.start,
          end: education.end,
        }))}
        handleEdit={handleEdit}
      />
    </>
  )
}

export default AddedEducations
