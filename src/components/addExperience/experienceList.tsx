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

const experienceList = ({ experiences, handleSetExperiences }: any) => {
  return (
    <List>
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
    </List>
  )
}

export default experienceList
