import React from 'react'
import List from '../List'
import { OntologyType, OntologyConceptResponse } from '../../generated/myskills'

type MutationVariables = {
  variables: {
    occupation: {
      name: string
      id: string
      type: OntologyType
    }
  }
}

interface ExperienceListProps {
  occupations: OntologyConceptResponse[]
  addOccupation?: (variables: MutationVariables) => void
}

const ExperienceList: React.FC<ExperienceListProps> = ({
  occupations,
  addOccupation,
}) => {
  return (
    <List>
      {occupations.map((occupation: OntologyConceptResponse, i: number) => {
        return (
          <li key={i}>
            {addOccupation && (
              <button
                onClick={() =>
                  addOccupation({
                    variables: {
                      occupation,
                    },
                  })
                }
              >
                {occupation.name}
              </button>
            )}
          </li>
        )
      })}
    </List>
  )
}

export default ExperienceList
