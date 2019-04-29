import React from 'react'
import Flex from './Flex'
import Tag from './Tag'
import { ClientSkillProps } from '../views/CreateProfile/MatchSkills'

interface SkillsListProps {
  skills: ClientSkillProps[]
  handleAddSkill: (skill: ClientSkillProps) => void
}

const SkillsList: React.FC<SkillsListProps> = ({ skills, handleAddSkill }) => (
  <>
    föreslagna kompetenser:
    <Flex justifyContent="center" flexWrap="wrap" style={{ width: '80%' }}>
      {skills.map(skill => (
        <Tag
          key={skill.id}
          m={5}
          onClick={() => handleAddSkill(skill)}
          variant={skill.isActive ? 'active' : 'default'}
        >
          {skill.term}
        </Tag>
      ))}
    </Flex>
  </>
)

export default SkillsList
