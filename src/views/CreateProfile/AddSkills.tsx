import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
// import MatchSkills from 'views/partials/MatchSkills'
import React from 'react'
import {
  SkillInput,
  GetOccupationClientQuery,
  GetOccupationClientQueryVariables,
  GetSkillsClientQuery,
  GetSkillsClientQueryVariables,
  AddSkillClientMutation,
  AddSkillClientMutationVariables,
  RemoveSkillClientMutation,
  RemoveSkillClientMutationVariables,
} from 'generated/myskills'
import { useQuery, useMutation } from 'react-apollo-hooks'
import {
  GET_OCCUPATION_CLIENT,
  GET_SKILLS_CLIENT,
} from 'graphql/shared/Queries'
import { ADD_SKILL_CLIENT, REMOVE_SKILL_CLIENT } from 'graphql/shared/Mutations'
import MatchSkills from 'views/partials/MatchSkills'

const AddSkills: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/skapa-cv/erfarenheter')
  }

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

  return (
    <Layout>
      <Navigation section="Kompetens" step={2} />
      <MatchSkills
        addSkillMutation={addSkillMutation}
        removeSkillMutation={removeSkillMutation}
        skills={skills}
        buttonText="Fortsätt"
        onSubmit={handleSubmit}
        occupation={occupation}
        handleSkillClick={handleSkillClick}
      />
    </Layout>
  )
}

export default AddSkills
