import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
// import MatchSkills from 'views/partials/MatchSkills'
import MatchSkills from 'views/partials/MatchSkills2'
import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import {
  GetOccupationClientQuery,
  GetOccupationClientQueryVariables,
  GetSkillsClientQuery,
  GetSkillsClientQueryVariables,
  AddSkillClientMutation,
  AddSkillClientMutationVariables,
  RemoveSkillClientMutation,
} from 'generated/myskills'
import {
  GET_OCCUPATION_CLIENT,
  GET_SKILLS_CLIENT,
} from 'graphql/shared/Queries'
import { ADD_SKILL_CLIENT, REMOVE_SKILL_CLIENT } from 'graphql/shared/Mutations'

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

  const addSkill = useMutation<
    AddSkillClientMutation,
    AddSkillClientMutationVariables
  >(ADD_SKILL_CLIENT)

  const removeSkill = useMutation<RemoveSkillClientMutation, any>(
    REMOVE_SKILL_CLIENT
  )

  return (
    <Layout>
      <Navigation section="Kompetens" step={2} />
      <MatchSkills
        addSkill={addSkill}
        buttonText="Fortsätt"
        occupation={occupation}
        onSubmit={handleSubmit}
        removeSkill={removeSkill}
        skills={skills}
      />
    </Layout>
  )
}

export default AddSkills
