import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from 'react-testing-library'
import Login, { GET_CONSENT_ID } from '../Login'

const mocks = [
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
    <MockedProvider addTypename={false} mocks={mocks}>
      <Login path="/" />
    </MockedProvider>
  )

  // to pass loading state lib or other solution for this?
  await new Promise(res => setTimeout(res, 0))

  expect(container).toMatchSnapshot()
})
