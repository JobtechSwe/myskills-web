import * as serviceWorker from './serviceWorker'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import client from './graphql/client'
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyle } from './theme'
import ContextProvider from './components/ContextProvider/ContextProvider'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyle} />
          <App />
        </ThemeProvider>
      </ContextProvider>
    </ApolloProviderHooks>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
