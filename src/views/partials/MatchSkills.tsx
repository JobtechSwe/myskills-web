import ButtonToInput from 'components/ButtonToInput'
import Flex from 'components/Flex'
import React from 'react'
import TagList from 'components/TagList'
import { H1, Paragraph } from 'components/Typography'
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
  AddSkillClientMutation,
  AddSkillClientMutationVariables,
  GetOccupationClientQuery,
  GetOccupationClientQueryVariables,
  GetSkillsClientQueryVariables,
  GetSkillsClientQuery,
  Occupation,
  OntologyRelationResponse,
  OntologyType,
  RemoveSkillClientMutation,
  RemoveSkillClientMutationVariables,
  SkillInput,
} from 'generated/myskills.d'
import { FooterButton } from 'components/Layout/Registration'

interface MatchSkillsProps {
  buttonText: string
  onSubmit: () => void
}

const MatchSkills: React.FC<
  WithApolloClient<RouteComponentProps & MatchSkillsProps>
> = ({ buttonText, client, onSubmit }) => {
  const {
    data: { occupation },
  } = useQuery<GetOccupationClientQuery, GetOccupationClientQueryVariables>(
    GET_OCCUPATION_CLIENT
  )

  const {
    data: { skills = [] },
  } = useQuery<GetSkillsClientQuery, GetSkillsClientQueryVariables>(
    GET_SKILLS_CLIENT
  )

  const addSkillMutation = useMutation<
    AddSkillClientMutation,
    AddSkillClientMutationVariables
  >(ADD_SKILL_CLIENT)
  const removeSkillMutation = useMutation<
    RemoveSkillClientMutation,
    RemoveSkillClientMutationVariables
  >(REMOVE_SKILL_CLIENT)

  const [relatedSkills, setRelatedSkills] = React.useState<
    OntologyRelationResponse[]
  >([])

  const getRelatedSkills = React.useCallback(
    async (terms: (SkillInput | Occupation)[]) => {
      const { data } = await client.query({
        query: GET_RELATED_SKILLS,
        variables: {
          concepts: terms.map(({ term }) => term),
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

  const handleSkillClick = (skill: SkillInput) => {
    const hasSkill = skills.some((s: SkillInput) => s.term === skill.term)

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
    <>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <H1 mb={20}>Vilka är dina kompetenser?</H1>
        <Paragraph mb="large" mt={0} textAlign="center">
          Ditt val av yrkesroll matchar ofta nedan föreslagna kompetenser.
          Markera dina eller lägg till egna.
        </Paragraph>
        <TagList
          activeItems={skills}
          items={relatedSkills
            .map(ontologyRelationToSkill)
            .filter(
              (relatedSkill: SkillInput) =>
                !skills.some((s: SkillInput) => s.term === relatedSkill.term)
            )}
          onSelect={handleSkillClick}
        />
        <ButtonToInput
          buttonText="+ Lägg till kompetens"
          inputPlaceholder="Lägg till kompetens"
          onSelect={handleFreeTextSkill}
        />
      </Flex>
      <FooterButton onClick={onSubmit} text={buttonText} />
    </>
  )
}

export default withApollo(MatchSkills)