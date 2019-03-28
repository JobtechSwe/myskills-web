/* eslint-disable */
import * as React from 'react'
import Login, { GET_CONSENT_ID } from '../Login'
import gql from 'graphql-tag'
import { render } from '../../../utils/test-utils'
import { fireEvent, wait } from 'react-testing-library'

const login = {
  id: 'db993c65-0673-454e-b951-bcb8d274f184',
  expires: '1552561115',
  __typename: 'Login',
}
const getConsentMock = [
  {
    request: {
      query: GET_CONSENT_ID,
    },
    result: {
      data: {
        login,
      },
    },
  },
]

jest.mock('../Consent', () => () => <p>db993c65-0673-454e-b951-bcb8d274f184</p>)

describe('pages/Login', () => {
  it('renders without errors', async () => {
    const { container } = render(<Login />, [])

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('should render loading state initially', async () => {
    const { getByText } = render(<Login />, getConsentMock)

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

  // TODO(@all): Use waitForElement
  it('should render consentId after Login is clicked', async () => {
    const { getByText } = render(<Login />, getConsentMock)

    fireEvent.click(getByText(/login/i))

    await wait()

    expect(getByText(login.id)).toBeInTheDocument()
  })
})
