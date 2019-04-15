import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Button from '../../components/Button'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const GET_EXPERIENCES_CLIENT = gql`
  query experiences {
    experiences @client {
      term
      taxonomyId
    }
  }
`

export const ADD_EXPERIENCE = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      term
    }
  }
`

const CreateProfile: React.FC<RouteComponentProps> = ({ children }) => {
  const { data } = useQuery(GET_EXPERIENCES_CLIENT)
  const addExperienceMutation = useMutation(ADD_EXPERIENCE, {
    fetchPolicy: 'no-cache',
  })

  const handleSave = () => {
    addExperienceMutation({
      variables: {
        experience: {
          term: data.experiences[0].name,
          taxonomyId: data.experiences[0].taxonomyId,
          years: '0.1',
        },
      },
    })
  }

  return (
    <Grid justifyContent="center">
      {children}
      <Button mt={32} onClick={() => handleSave()} variant="secondary">
        Spara i MyData
      </Button>
    </Grid>
  )
}

export default CreateProfile
