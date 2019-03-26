import React, { useEffect, useContext } from 'react'
import { Context } from '../../Context'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import AddExperience from '../../components/AddExperience/AddExperience'

const Wrapper = styled.section`
  padding-top: 4rem;
  display: flex;

  align-items: center;
  flex-flow: column nowrap;
`

const CreateProfile: React.FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    dispatch({ type: 'logo_active' })
  }, [state.logoActive])
  return (
    <Wrapper>
      <AddExperience />
    </Wrapper>
  )
}

export default CreateProfile
