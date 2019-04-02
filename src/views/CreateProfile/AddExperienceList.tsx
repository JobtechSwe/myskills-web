import React from 'react'
import styled from '@emotion/styled'
import gql from 'graphql-tag'
import { Taxonomy } from '../../generated/myskills'
import { useMutation } from 'react-apollo-hooks'

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

export const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) @client
  }
`

interface AddExperienceListProps {
  experiences: Taxonomy.Result[]
}

const AddExperienceList: React.FC<AddExperienceListProps> = ({
  experiences,
}) => {
  const addExperience = useMutation(ADD_EXPERIENCE_CLIENT)

  return (
    <List>
      {experiences.map((experience: Taxonomy.Result, i: number) => {
        return (
          <li key={i}>
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
          </li>
        )
      })}
    </List>
  )
}

export default AddExperienceList
