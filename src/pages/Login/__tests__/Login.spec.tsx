import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from 'react-testing-library'
import Login from '../Login'
import gql from 'graphql-tag'
import theme from '../../../utils/stylesheet'
import { ThemeProvider } from 'emotion-theming'

const GET_CONSENT_ID = gql`
  mutation login {
    login {
      id
      expires
    }
  }
`
const getConsentMock = [
  {
    request: {
      query: GET_CONSENT_ID,
    },
    result: {
      data: {
        consent: { id: '123456789', expires: '123' },
      },
    },
  },
]

it('renders without errors', async () => {
  const { container } = render(
    <MockedProvider addTypename={false} mocks={getConsentMock}>
      <ThemeProvider theme={theme}>
        <Login path="/" />
      </ThemeProvider>
    </MockedProvider>
  )

  // to pass loading state lib or other solution for this?
  await new Promise(res => setTimeout(res, 0))

  expect(container).toMatchSnapshot()
})
