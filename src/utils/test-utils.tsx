import * as React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MockLink, MockedProvider } from 'react-apollo/test-utils'
import { ThemeProvider } from 'emotion-theming'
import { render as rtlRender } from 'react-testing-library'
import { theme } from 'theme'

export const render = (children: React.ReactNode, mocks?: any[]) => {
  const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename: true }),
    link: new MockLink(mocks || []),
  })

  return rtlRender(
    <MockedProvider addTypename={true} mocks={mocks}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ApolloProvider>
    </MockedProvider>
  )
}
