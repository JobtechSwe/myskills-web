import React from 'react'

const SkillsList = ({ skills, getSkills }: any) => {
  return skills.map((skill: any, i: number) => (
    <div key={i} onClick={() => getSkills(skill)}>
      {skill}
    </div>
  ))
}

export default SkillsList
