import React from 'react'
import { MutationHookOptions } from 'react-apollo-hooks'
import {
  MutationAddSkillArgs,
  MutationRemoveSkillArgs,
  Skill,
  Occupation,
  OntologyType,
} from 'generated/myskills.d'
import Loader from 'components/Loader'
import TagList from 'components/TagList'
import { useGetSkills } from 'hooks/useGetSkills'
import Flex from 'components/Flex'
import ButtonToInput from 'components/ButtonToInput'
import { v4 } from 'uuid'
import { FooterButton } from 'components/Layout/Registration'

interface MatchSkillsProps {
  buttonText: string
  onSubmit: () => void
  addSkill: (skill: MutationHookOptions<{}, MutationAddSkillArgs>) => any
  removeSkill: (id: MutationHookOptions<{}, MutationRemoveSkillArgs>) => any
  occupation?: Occupation
  skills: Skill[]
}

const MatchSkills: React.FC<MatchSkillsProps> = ({
  occupation,
  skills,
  addSkill,
  removeSkill,
  onSubmit,
  buttonText,
}) => {
  const [relatedData, getRelatedData, loading] = useGetSkills()

  React.useEffect(() => {
    if (!relatedData.length && occupation) getRelatedData([occupation])
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

      if (occupation) getRelatedData([skill])
    }
  }

  const handleInputSubmit = (value: string) =>
    addSkill({
      variables: {
        skill: {
          term: value,
          type: OntologyType.Skill,
          sourceId: v4(),
        },
      },
    })

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="flex-start"
    >
      {relatedData.length > 0 && occupation ? (
        <TagList
          activeItems={skills}
          items={relatedData.filter(x => !skills.some(y => y.term === x.term))}
          onSelect={handleClick}
        />
      ) : (
        <TagList activeItems={skills} items={[]} onSelect={handleClick} />
      )}
      <ButtonToInput
        buttonText="+ Lägg till kompetens"
        inputPlaceholder="Lägg till kompetens"
        onSelect={handleInputSubmit}
      />
      {loading && <Loader />}
      <FooterButton onClick={onSubmit} text={buttonText} />
    </Flex>
  )
}

export default MatchSkills
