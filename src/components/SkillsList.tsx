import React from 'react'
import Grid from './Grid'
import Tag from './Tag'
import { ClientSkillProps } from '../views/CreateProfile/MatchSkills'
import styled from '@emotion/styled'
import { OntologyRelationResponse } from '../generated/myskills'

interface SkillsListProps {
  skills: ClientSkillProps[]
  handleAddSkill: (skill: ClientSkillProps) => void
}

const SkillsList: React.FC<SkillsListProps> = ({ skills, handleAddSkill }) => (
  <>
    föreslagna kompetenser:
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
      style={{ width: '100vw' }}
    >
      {skills.map(skill => (
        <Tag
          key={skill.id}
          onClick={() => handleAddSkill(skill)}
          variant={skill.isActive ? 'active' : 'default'}
        >
          {skill.term}
        </Tag>
      ))}
    </Grid>
  </>
)

export default SkillsList
