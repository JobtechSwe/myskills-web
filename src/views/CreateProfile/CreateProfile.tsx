import React, {
  useEffect,
  useContext,
  ComponentElement,
  FunctionComponent,
  ReactNode,
} from 'react'
import { Context } from '../../components/ContextProvider/ContextProvider'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'

const AddButton = styled.button`
  background: white;
  padding: 15px 25px;
`
const Wrapper = styled.section`
  padding-top: 4rem;
  display: flex;

  align-items: center;
  flex-flow: column nowrap;
`

const CreateProfile: React.FC<RouteComponentProps> = ({ children }) => {
  const { state, dispatch } = useContext(Context)
  useEffect(() => {
    dispatch({ type: 'logo_active' })
  }, [state.logoActive])
  return (
    <Wrapper>
      {children}
      <AddButton>Spara i MyData</AddButton>
    </Wrapper>
  )
}

export default CreateProfile
