import React from 'react'
import { Taxonomy } from '../../generated/myskills'
import List from '../List'

type MutationVariables = {
  variables: {
    experience: {
      name: string
      years: string
      taxonomyId: string
      __typename: string | undefined
    }
  }
}

interface ExperienceListProps {
  list: Taxonomy.Result[]
  addExperience?: (variables: MutationVariables) => void
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
                        __typename: experience.__typename,
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
