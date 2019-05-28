import React from 'react'
import { MutationHookOptions } from 'react-apollo-hooks'
import {
  MutationAddSkillArgs,
  MutationRemoveSkillArgs,
  Skill,
  Occupation,
} from 'generated/myskills'
import Loader from 'components/Loader'
import TagList from 'components/TagList'
import { useGetSkills } from 'hooks/useGetSkills'

interface MatchSkillsProps {
  buttonText: string
  onSubmit: () => void
  addSkill: (skill: MutationHookOptions<{}, MutationAddSkillArgs>) => any
  removeSkill: (id: MutationHookOptions<{}, MutationRemoveSkillArgs>) => any
  occupation: Occupation
  skills: Skill[]
}

const MatchSkills: React.FC<MatchSkillsProps> = ({
  occupation,
  skills,
  addSkill,
  removeSkill,
}) => {
  const [relatedData, getRelatedData, loading] = useGetSkills()

  React.useEffect(() => {
    if (!relatedData.length) getRelatedData([occupation])
  }, [occupation, getRelatedData, relatedData.length])

  const handleClick = (skill: Skill) => {
    const hasSkill = skills.some(s => s.term === skill.term)
    if (hasSkill) {
      removeSkill({
        variables: {
          id: skill.id,
        },
      })
    } else {
      addSkill({
        variables: {
          skill,
        },
      })
      getRelatedData([skill])
    }
  }

  return (
    <>
      {relatedData.length > 0 && (
        <TagList
          activeItems={skills}
          items={relatedData.filter(
            (x: any) => !skills.some((y: any) => y.term === x.term)
          )}
          onSelect={handleClick}
        />
      )}
      {loading && <Loader />}
    </>
  )
}

export default MatchSkills
