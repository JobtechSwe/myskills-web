import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Experiences from 'views/partials/Experiences'
import { Layout, Navigation } from 'components/Layout/Registration'
import {
  Experience,
  Mutation,
  MutationAddExperienceArgs,
  GetExperiencesQuery,
  MutationRemoveExperienceArgs,
  MutationEditExperienceArgs,
} from 'generated/myskills.d'
import {
  ADD_EXPERIENCE_CLIENT,
  REMOVE_EXPERIENCE_CLIENT,
  UPDATE_EXPERIENCE_CLIENT,
} from 'graphql/shared/Mutations'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { GET_EXPERIENCES_CLIENT } from 'graphql/resolvers/mutations'

const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const {
    data: { experiences },
  } = useQuery<GetExperiencesQuery>(GET_EXPERIENCES_CLIENT)

  const addExperience = useMutation<
    Mutation['addExperience'],
    MutationAddExperienceArgs
  >(ADD_EXPERIENCE_CLIENT)

  const removeExperience = useMutation<
    Mutation['removeExperience'],
    MutationRemoveExperienceArgs
  >(REMOVE_EXPERIENCE_CLIENT)

  const updateExperience = useMutation<
    Mutation['editExperience'],
    MutationEditExperienceArgs
  >(UPDATE_EXPERIENCE_CLIENT)

  const handleSubmit = (_experiences: Experience[]) => {
    navigate('/skapa-cv/utbildning')
  }

  return (
    <Layout>
      <Navigation section="ERFARENHET" step={3} />
      {experiences && (
        <Experiences
          addExperience={addExperience}
          buttonText="Fortsätt"
          experiences={experiences}
          onSubmit={handleSubmit}
          removeExperience={removeExperience}
          updateExperience={updateExperience}
        />
      )}
    </Layout>
  )
}

export default WorkExperiences
