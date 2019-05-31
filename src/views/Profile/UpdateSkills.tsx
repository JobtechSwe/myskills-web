import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import MatchSkills from 'views/partials/MatchSkills2'
import React from 'react'
import {
  SkillsQueryVariables,
  SkillsQuery,
  Mutation,
  MutationAddSkillArgs,
  MutationRemoveSkillArgs,
} from 'generated/myskills'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

const GET_SKILLS = gql`
  query skills {
    skills {
      term
      type
      id
      sourceId
    }
  }
`

const ADD_SKILL = gql`
  mutation addSkill($skill: SkillInput!) {
    addSkill(skill: $skill) {
      term
    }
  }
`

const REMOVE_SKILL = gql`
  mutation removeSkill($id: String!) {
    removeSkill(id: $id)
  }
`
const UpdateSkills: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/profil/erfarenheter')
  }

  const {
    data: { skills = [] },
  } = useQuery<SkillsQuery, SkillsQueryVariables>(GET_SKILLS, {
    fetchPolicy: 'network-only',
  })

  const addSkill = useMutation<Mutation['addSkill'], MutationAddSkillArgs>(
    ADD_SKILL,
    {
      refetchQueries: [{ query: GET_SKILLS }],
    }
  )

  const removeSkill = useMutation<
    Mutation['removeSkill'],
    MutationRemoveSkillArgs
  >(REMOVE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  })

  return (
    <Layout>
      <Navigation section="Kompetens" step={2} />
      {skills.length > 0 && (
        <MatchSkills
          addSkill={addSkill}
          buttonText="Spara"
          onSubmit={handleSubmit}
          removeSkill={removeSkill}
          skills={skills}
        />
      )}
    </Layout>
  )
}

export default UpdateSkills
