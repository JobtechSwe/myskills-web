import React from 'react'

const SkillsList = ({ skills, getSkills }: any) => {
  return skills.map((skill: string, i: number) => (
    <div key={i} onClick={() => getSkills([...skills, skill])}>
      {skill}
    </div>
  ))
}

export default SkillsList
