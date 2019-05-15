import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { H1 } from '../../components/Typography'
import gql from 'graphql-tag'
import Timeline from '../../components/Timeline'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { GET_EXPERIENCES_CLIENT } from '../../graphql/resolvers/mutations/addExperience'
import { Experience } from '../../generated/myskills'
import AddAndEditForm from '../../components/AddAndEditForm'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'
import styled from '@emotion/styled'

const TimelineStyled = styled(Timeline)`
  margin-bottom: 20px;
`

const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      employer
      end
      start
      term
    }
  }
`

export const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const addExperienceClient = useMutation(ADD_EXPERIENCE_CLIENT)
  const {
    data: { experiences },
  } = useQuery(GET_EXPERIENCES_CLIENT)

  const handleSubmit = (formState: any) => {
    addExperienceClient({
      variables: { experience: formState },
    })
  }

  return (
    <RegistrationLayout headerText="ERFARENHET" nextPath="utbildning" step={3}>
      <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
      <TimelineStyled
        entries={experiences.map((exp: Experience) => ({
          title: exp.term,
          schoolOrCompany: exp.employer,
          start: exp.start,
          end: exp.end,
        }))}
      />
      <AddAndEditForm
        label="Lägg till erfarenhet"
        onSubmit={handleSubmit}
        schoolOrCompanyPlaceholder="Arbetsgivare..."
        titlePlaceholder="Namn på tjänst..."
      />
    </RegistrationLayout>
  )
}

export default WorkExperiences
