import React from 'react'
import Grid from './Grid'
import { ClientSkillProps } from '../views/CreateProfile/MatchSkills'
import styled from '@emotion/styled'
import { OntologyRelationResponse } from '../generated/myskills'

interface SkillsListProps {
  skills: ClientSkillProps[]
  handleAddSkill: (skill: ClientSkillProps) => void
}

type ItemProps = {
  isActive: boolean
}

const Item = styled.div<ItemProps>`
  background: ${props => (props.isActive ? 'green' : 'none')};
`

const SkillsList: React.FC<SkillsListProps> = ({ skills, handleAddSkill }) => (
  <>
    föreslagna kompetenser:
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
      style={{ width: '100vw' }}
    >
      {skills.map(skill => (
        <Item
          isActive={skill.isActive}
          key={skill.id}
          onClick={() => handleAddSkill(skill)}
        >
          {skill.term}
        </Item>
      ))}
    </Grid>
  </>
)

export default SkillsList
