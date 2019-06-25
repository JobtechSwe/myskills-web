import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Experiences from 'views/partials/Experiences'
import { Layout, Navigation } from 'components/Layout/Registration'
import {
  GetExperiencesQuery,
  Mutation,
  MutationAddExperienceArgs,
  MutationRemoveExperienceArgs,
  MutationEditExperienceArgs,
} from 'generated/myskills.d'
import Loader from 'components/Loader'
import {
  ADD_EXPERIENCE,
  REMOVE_EXPERIENCE,
  EDIT_EXPERIENCE,
} from 'graphql/shared/Mutations'
import { GET_EXPERIENCES } from 'graphql/shared/Queries'

import { useMutation, useQuery } from 'react-apollo-hooks'

const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const {
    data: { experiences },
    loading,
    error,
  } = useQuery<GetExperiencesQuery>(GET_EXPERIENCES, {
    fetchPolicy: 'network-only',
  })

  const addExperience = useMutation<
    Mutation['addExperience'],
    MutationAddExperienceArgs
  >(ADD_EXPERIENCE, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: GET_EXPERIENCES }],
  })

  const removeExperience = useMutation<
    Mutation['removeExperience'],
    MutationRemoveExperienceArgs
  >(REMOVE_EXPERIENCE, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: GET_EXPERIENCES }],
  })

  const updateExperience = useMutation<
    Mutation['editExperience'],
    MutationEditExperienceArgs
  >(EDIT_EXPERIENCE, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: GET_EXPERIENCES }],
  })

  const handleSubmit = () => {
    navigate('/profil')
  }

  return (
    <Layout>
      <Navigation section="ERFARENHET" />
      {error && <div>error...</div>}
      {loading && <Loader />}
      {experiences && (
        <Experiences
          addExperience={addExperience}
          buttonText="Spara"
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
