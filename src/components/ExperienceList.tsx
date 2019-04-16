import React from 'react'
import { TaxonomyDefaultResult } from '../generated/myskills'
import List from './List'

type MutationVariables = {
  variables: {
    experience: {
      term: string
      years: string
      taxonomyId: string
    }
  }
}

interface ExperienceListProps {
  list: TaxonomyDefaultResult[]
  addExperience?: (variables: MutationVariables) => void
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  list,
  addExperience,
}) => {
  return (
    <List>
      {list.map((experience: TaxonomyDefaultResult, i: number) => {
        return (
          <li key={i}>
            {addExperience ? (
              <button
                onClick={() =>
                  addExperience({
                    variables: {
                      experience: {
                        term: experience.term,
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
