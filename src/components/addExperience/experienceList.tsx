import React from 'react'
type ExperienceListProps = {}
const experienceList = ({ experiences, handleSetExperiences }: any) => {
  return (
    <ul>
      {experiences
        .filter(({ taxonomyId }: { taxonomyId: string }) =>
          experiences.some(
            (y: { taxonomyId: string }) => y.taxonomyId === taxonomyId
          )
        )
        .map((c: { term: string }, i: number) => (
          <li key={i} onClick={() => handleSetExperiences(c)}>
            {c.term}
          </li>
        ))}
    </ul>
  )
}

export default experienceList
