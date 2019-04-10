import React from 'react'
import { TaxonomyResult } from '../../generated/myskills'
import List from '../List'

type MutationVariables = {
  variables: {
    experience: {
      name: string
      years: string
      taxonomyId: string
    }
  }
}

interface ExperienceListProps {
  list: TaxonomyResult[]
  addExperience?: (variables: MutationVariables) => void
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  list,
  addExperience,
}) => {
  return (
    <List>
      {list.map((experience: TaxonomyResult, i: number) => {
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
