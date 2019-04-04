import React from 'react'
import styled from '@emotion/styled'
import { Taxonomy } from '../../generated/myskills'

type MutaionVariables = {
  variables: {
    experience: {
      name: string
      years: string
      taxonomyId: string
    }
  }
}

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

interface ExperienceListProps {
  list: Taxonomy.Result[]
  addExperience?: (variables: MutaionVariables) => void
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  list,
  addExperience,
}) => {
  return (
    <List>
      {list.map((experience: Taxonomy.Result, i: number) => {
        return (
          <li key={i}>
            {addExperience ? (
              <button
                onClick={() =>
                  addExperience({
                    variables: {
                      experience: {
                        name: experience.term,
                        years: '',
                        taxonomyId: experience.taxonomyId,
                      },
                    },
                  })
                }
              >
                {experience.term}
              </button>
            ) : (
              <p>{experience.term}</p>
            )}
          </li>
        )
      })}
    </List>
  )
}

export default ExperienceList
