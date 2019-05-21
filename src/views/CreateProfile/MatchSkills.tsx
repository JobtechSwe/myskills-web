import ButtonToInput from 'components/ButtonToInput'
import Flex from 'components/Flex'
import React from 'react'
import TagList from 'components/TagList'
import { H1 } from 'components/Typography'
import { RouteComponentProps } from '@reach/router'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { v4 } from 'uuid'
import { withApollo, WithApolloClient } from 'react-apollo'
import { ADD_SKILL_CLIENT, REMOVE_SKILL_CLIENT } from 'graphql/shared/Mutations'
import {
  GET_RELATED_SKILLS,
  GET_SKILLS_CLIENT,
  GET_OCCUPATION_CLIENT,
} from 'graphql/shared/Queries'
import {
  OntologyType,
  OntologyRelationResponse,
  Skill,
  SkillInput,
} from 'generated/myskills.d'
import RegistrationLayout from 'components/Layout/RegistrationLayout'

const MatchSkills: React.FC<WithApolloClient<RouteComponentProps>> = ({
  client,
}) => {
  const {
    data: { occupation = {} },
  }: any = useQuery(GET_OCCUPATION_CLIENT)

  const {
    data: { skills = [] },
  }: any = useQuery(GET_SKILLS_CLIENT)

  const addSkillMutation = useMutation(ADD_SKILL_CLIENT)
  const removeSkillMutation = useMutation(REMOVE_SKILL_CLIENT)

  const [relatedSkills, setRelatedSkills] = React.useState<
    OntologyRelationResponse[]
  >([])

  const getRelatedSkills = React.useCallback(
    async (skills: any[]) => {
      const { data } = await client.query({
        query: GET_RELATED_SKILLS,
        variables: {
          concepts: skills.map(({ term }) => term),
          limit: 5,
          type: OntologyType.Skill,
        },
      })

      setRelatedSkills(data.ontologyRelated.relations)
    },
    [client]
  )

  React.useEffect(() => {
    skills.length ? getRelatedSkills(skills) : getRelatedSkills([occupation])
  }, [skills, occupation, getRelatedSkills])

  const handleSkillClick = (skill: Skill) => {
    const hasSkill = skills.some((s: Skill) => s.term === skill.term)

    if (hasSkill) {
      removeSkillMutation({
        variables: {
          skill,
        },
      })
    } else {
      addSkillMutation({
        variables: {
          skill,
        },
      })
    }
  }

  const handleFreeTextSkill = (value: string) => {
    const skill = {
      term: value,
      type: OntologyType.Skill,
      sourceId: v4(),
    }

    addSkillMutation({
      variables: {
        skill,
      },
    })
  }

  const ontologyRelationToSkill = (
    ontologyItem: OntologyRelationResponse
  ): SkillInput => ({
    sourceId: ontologyItem.id,
    term: ontologyItem.term,
    type: ontologyItem.type,
  })

  return (
    <RegistrationLayout headerText="KOMPETENS" nextPath="erfarenheter" step={2}>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <H1 mb={20}>Vilka är dina kompetenser?</H1>
        <TagList
          activeItems={skills.map((s: SkillInput) => ({
            ...s,
            id: s.sourceId,
          }))}
          items={relatedSkills
            .map(ontologyRelationToSkill)
            .filter(
              (relatedSkill: SkillInput) =>
                !skills.some((s: SkillInput) => s.term === relatedSkill.term)
            )
            .map(s => ({ ...s, id: s.sourceId }))}
          onSelect={handleSkillClick}
        />
        <ButtonToInput
          buttonText="+ Lägg till en kompetens"
          inputPlaceholder="Lägg till en kompetens"
          onSelect={handleFreeTextSkill}
        />
      </Flex>
    </RegistrationLayout>
  )
}

export default withApollo(MatchSkills)
