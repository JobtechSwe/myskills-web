import React, { useEffect, useContext } from 'react'
import { Context } from '../../components/ContextProvider/ContextProvider'
import { Flex } from '../../components/Flex/Flex'
import Button from '../../components/Button/Button'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import AddExperience from '../../components/Experience/AddExperience'

const AddButton = styled.button`
  background: white;
  padding: 15px 25px;
`

const CreateProfile: React.FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    dispatch({ type: 'logo_active' })
  }, [state.logoActive])

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <AddExperience />
      <Button variant="secondary">Spara i MyData</Button>
    </Flex>
  )
}

export default CreateProfile
