import * as React from 'react'
import AddExperience, {
  GET_EXPERIENCES,
  GET_EXPERIENCES_CLIENT,
} from '../AddExperience'
import { render } from '../../../utils/test-utils'
import { wait, cleanup, fireEvent, getByText } from 'react-testing-library'

afterEach(cleanup)

jest.useFakeTimers()

describe('views/AddExperience', () => {
  const mocks = [
    {
      request: {
        query: GET_EXPERIENCES,
        variables: {
          q: '',
          type: 'OCCUPATION_NAME',
        },
      },
      result: {
        data: {
          __typename: 'Taxonomy',
          taxonomy: {
            result: [],
          },
        },
      },
    },
    {
      request: {
        query: GET_EXPERIENCES_CLIENT,
      },
      result: {
        data: {
          __typename: 'Experiences',
          experiences: [],
        },
      },
    },
  ]
  it('renders empty result', async () => {
    const { container } = render(<AddExperience />, mocks)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it.only('should render with taxonomy query result', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_EXPERIENCES,
          variables: {
            q: 'Systemutvecklare',
            type: 'OCCUPATION_NAME',
          },
        },
        result: {
          data: {
            __typename: 'Taxonomy',
            taxonomy: {
              result: [{ term: 'Systemutvecklare' }],
            },
          },
        },
      },
      {
        request: {
          query: GET_EXPERIENCES_CLIENT,
        },
        result: {
          data: {
            __typename: 'Experiences',
            experiences: [],
          },
        },
      },
    ]

    const { container, getByPlaceholderText, getByText } = render(
      <AddExperience />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Sök yrken'), {
      target: { value: 'Systemutvecklare' },
    })
    expect(container).toMatchSnapshot()
  })
})
