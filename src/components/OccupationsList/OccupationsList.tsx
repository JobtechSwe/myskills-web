import React from 'react'
import { OntologyType, OntologyConceptResponse } from '../../generated/myskills'
import List from '../List'
import ListItem from '../ListItem'

type MutationVariables = {
  variables: {
    occupation: {
      name: string
      id: string
      type: OntologyType
    }
  }
}

interface OccupationsListProps {
  occupations: OntologyConceptResponse[]
  addOccupation?: (variables: MutationVariables) => void
}

const OccupationsList: React.FC<OccupationsListProps> = ({
  occupations,
  addOccupation,
}) => {
  return (
    <List>
      {occupations.map((occupation: OntologyConceptResponse, i: number) => {
        if (addOccupation) {
          return (
            <ListItem
              background={'dodgerblue'}
              key={i}
              onClick={() =>
                addOccupation({
                  variables: {
                    occupation,
                  },
                })
              }
            >
              {occupation.name}
            </ListItem>
          )
        }

        return <ListItem key={i}>{occupation.name}</ListItem>
      })}
    </List>
  )
}

export default OccupationsList
