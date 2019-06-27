import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Experiences from 'views/partials/Experiences'
import { Layout, Navigation } from 'components/Layout/Registration'
import {
  Experience,
  Mutation,
  MutationAddExperienceArgs,
  GetExperiencesQuery,
  GetOccupationClientQuery,
  MutationRemoveExperienceArgs,
  MutationEditExperienceArgs,
  QueryTriviaArgs,
  Query,
} from 'generated/myskills.d'
import { GET_TRIVIA, GET_OCCUPATION_CLIENT } from 'graphql/shared/Queries'
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

  const {
    data: { occupation },
  } = useQuery<GetOccupationClientQuery>(GET_OCCUPATION_CLIENT)

  const {
    data: { trivia },
  } = useQuery<
    {
      trivia: Query['trivia']
    },
    QueryTriviaArgs
  >(GET_TRIVIA, {
    variables: {
      occupation: occupation.term,
    },
  })

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
    if (trivia && trivia.info) {
      navigate('/skapa-cv/visste-du-att', {
        state: trivia,
      })
    } else {
      navigate('/skapa-cv/utbildning')
    }
  }

  return (
    <Layout>
      <Navigation section="ERFARENHET" step={4} />
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
