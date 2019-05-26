import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Experiences from 'views/partials/Experiences'
import { Layout, Navigation } from 'components/Layout/Registration'
import { Experience } from 'generated/myskills.d'
import {
  ADD_EXPERIENCE_CLIENT,
  REMOVE_EXPERIENCE_CLIENT,
  UPDATE_EXPERIENCE_CLIENT,
} from 'graphql/shared/Mutations'
import { useMutation } from 'react-apollo-hooks'

const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const addExperience = useMutation(ADD_EXPERIENCE_CLIENT)
  const removeExperience = useMutation(REMOVE_EXPERIENCE_CLIENT)
  const updateExperience = useMutation(UPDATE_EXPERIENCE_CLIENT)

  const handleSubmit = (_experiences: Experience[]) => {
    navigate('/skapa-cv/utbildning')
  }

  return (
    <Layout>
      <Navigation section="ERFARENHET" step={3} />
      <Experiences
        addExperience={addExperience}
        buttonText="Fortsätt"
        onSubmit={handleSubmit}
        removeExperience={removeExperience}
        updateExperience={updateExperience}
      />
    </Layout>
  )
}

export default WorkExperiences
