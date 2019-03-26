import React, {
  useReducer,
  createContext,
  ReducerState,
  Reducer,
  ContextType,
  ProviderProps,
} from 'react'

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
      console.log('type')

      return { ...state, logoActive: false }
      break
    default:
      return state
      break
  }
}

export default ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}
