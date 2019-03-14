import * as serviceWorker from './serviceWorker'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import client from './graphQL'
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks'
import { ApolloProvider } from 'react-apollo'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme, globalStyle } from './theme'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <App />
      </ThemeProvider>
    </ApolloProviderHooks>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
