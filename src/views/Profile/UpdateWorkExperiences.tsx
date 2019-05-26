import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Experiences from 'views/partials/Experiences'
import { Layout, Navigation } from 'components/Layout/Registration'
import { Experience } from 'generated/myskills.d'
import {
  ADD_EXPERIENCE,
  REMOVE_EXPERIENCE,
  EDIT_EXPERIENCE,
} from 'graphql/shared/Mutations'
import { useMutation } from 'react-apollo-hooks'

const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const addExperience = useMutation(ADD_EXPERIENCE, {
    fetchPolicy: 'no-cache',
  })
  const removeExperience = useMutation(REMOVE_EXPERIENCE, {
    fetchPolicy: 'no-cache',
  })
  const updateExperience = useMutation(EDIT_EXPERIENCE, {
    fetchPolicy: 'no-cache',
  })

  const handleSubmit = (_experiences: Experience[]) => {
    navigate('/skapa-cv/utbildning')
  }

  return (
    <Layout>
      <Navigation section="ERFARENHET" />
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
