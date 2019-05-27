/* eslint-disable */
import * as React from 'react'
import Login, { GET_LOGIN_ID } from '../Login'

import { render } from '../../../utils/test-utils'
import { fireEvent, wait, waitForElement } from 'react-testing-library'

const login = {
  url:
    'mydata://login/eyJzZXNzaW9uSWQiOiJlYjEzZjlmOC01YTI3LTQ1ZDItOTFiZC04OGUyZmI1OWU4MGEiLCJjbGllbnRJZCI6Imh0dHA6Ly9teXNraWxscy1hcGk6MzAwMCJ9',
  sessionId: 'dbf51774-bace-4723-8da4-a62913d163b7',
  __typename: 'Login',
}

const getLoginMock = [
  {
    request: {
      query: GET_LOGIN_ID,
    },
    result: {
      data: {
        login,
      },
    },
  },
]

jest.mock('../LoginQR', () => () => (
  <p>
    mydata://login/eyJzZXNzaW9uSWQiOiJlYjEzZjlmOC01YTI3LTQ1ZDItOTFiZC04OGUyZmI1OWU4MGEiLCJjbGllbnRJZCI6Imh0dHA6Ly9teXNraWxscy1hcGk6MzAwMCJ9
  </p>
))

describe('views/Login', () => {
  it('renders without errors', async () => {
    const { container } = render(<Login />, [])

    await wait()

    expect(container).toMatchSnapshot()
  })

  xit('should render loading state initially', async () => {
    const { getByText } = render(<Login />, getLoginMock)

    fireEvent.click(getByText(/login/i))

    expect(getByText(/loading.../i)).toBeInTheDocument()
  })

  it.skip('should render errors', async () => {
    const errorMock = [
      {
        request: {
          query: GET_CONSENT_ID,
        },
        result: {
          error: new Error('Error while trying to request consentId'),
        },
      },
    ]
    const { getByText } = render(<Login />, errorMock)

    fireEvent.click(getByText(/login/i))

    await wait()

    expect(getByText(/that’s an error./i)).toBeInTheDocument()
  })
})
