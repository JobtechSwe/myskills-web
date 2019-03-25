import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import AddExperience from '../../components/addExperience/AddExperience'

const Wrapper = styled.section`
  padding-top: 4rem;
  height: 100vh;
  display: flex;

  align-items: center;
  flex-flow: column nowrap;
`

const CreateProfile: React.FC<RouteComponentProps> = () => {
  return (
    <Wrapper>
      <AddExperience />
    </Wrapper>
  )
}

export default CreateProfile
