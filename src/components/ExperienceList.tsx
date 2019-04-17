import React from 'react'
import { TaxonomyDefaultResult } from '../generated/myskills'
import List from './List'
import ListItem from './ListItem'

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
        if (addExperience) {
          return (
            <ListItem
              key={i}
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
            </ListItem>
          )
        }

        return <ListItem key={i}>{experience.term}</ListItem>
      })}
    </List>
  )
}

export default ExperienceList
