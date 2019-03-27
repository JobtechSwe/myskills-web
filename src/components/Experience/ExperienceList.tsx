import React from 'react'
import styled from '@emotion/styled'

const List = styled.ul`
  color: white;
  font-family: 'Arial';
  padding: 0;
  font-weight: bold;
  text-align: center;
  li {
    margin-bottom: 5px;
    list-style: none;
    transition: all 100ms ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`

const ExperienceList = ({ experiences, handleSetExperiences }: any) => {
  return (
    <List>
      {experiences
        .filter(({ taxonomyId }: { taxonomyId: string }) =>
          experiences.some(
            (y: { taxonomyId: string }) => y.taxonomyId === taxonomyId
          )
        )
        .map((c: { term: string }, i: number) => (
          <li key={i}>
            <button onClick={() => handleSetExperiences(c)}>{c.term}</button>
          </li>
        ))}
    </List>
  )
}

export default ExperienceList
