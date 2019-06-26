import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import MatchSkills from 'views/partials/MatchSkills'
import React from 'react'
import { useMutation, useQuery } from 'react-apollo-hooks'
import {
  Mutation,
  MutationAddSkillArgs,
  MutationRemoveSkillArgs,
  OccupationQueryVariables,
  OccupationQuery,
  Skill,
} from 'generated/myskills'
import { ADD_SKILL, REMOVE_SKILL } from 'graphql/shared/Mutations'
import { GET_OCCUPATION, GET_SKILLS } from 'graphql/shared/Queries'

const AddSkills: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/profil')
  }

  const {
    data: { occupation },
  } = useQuery<OccupationQuery, OccupationQueryVariables>(GET_OCCUPATION, {
    fetchPolicy: 'network-only',
  })

  const {
    data: { skills, loading },
  } = useQuery(GET_SKILLS, {
    fetchPolicy: 'network-only',
  })

  const addSkillMutation = useMutation<
    Mutation['addSkill'],
    MutationAddSkillArgs
  >(ADD_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  })

  const removeSkillMutation = useMutation<
    Mutation['removeSkill'],
    MutationRemoveSkillArgs
  >(REMOVE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
  })

  const handleSkillClick = (skill: Skill) => {
    const hasSkill = skills.some((s: Skill) => s.term === skill.term)

    if (hasSkill) {
      removeSkillMutation({
        variables: {
          id: skill.id,
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
      <Navigation section="Kompetens" />
      {!loading && skills && (
        <MatchSkills
          addSkillMutation={addSkillMutation}
          removeSkillMutation={removeSkillMutation}
          skills={skills}
          buttonText="Spara"
          onSubmit={handleSubmit}
          occupation={occupation}
          handleSkillClick={handleSkillClick}
        />
      )}
    </Layout>
  )
}

export default AddSkills
