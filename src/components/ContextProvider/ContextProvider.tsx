import React, { useReducer, createContext } from 'react'

interface StateProps {
  logoActive: Boolean
}

interface ContextProps {
  state: StateProps
  dispatch: React.Dispatch<Action>
}

export const initialState: StateProps = {
  logoActive: true,
}

type Action = { type: 'logo_active' }

export const Context = createContext({ state: initialState } as ContextProps)

const reducer = (state: StateProps, action: Action): StateProps => {
  switch (action.type) {
    case 'logo_active':
      return { ...state, logoActive: false }
    default:
      return state
  }
}

const ContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
