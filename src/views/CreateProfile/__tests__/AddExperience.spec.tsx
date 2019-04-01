import * as React from 'react'
import AddExperience, {
  GET_EXPERIENCES,
  GET_EXPERIENCES_CLIENT,
} from '../AddExperience'
import { render } from '../../../utils/test-utils'
import { wait, cleanup } from 'react-testing-library'

afterEach(cleanup)

jest.useFakeTimers()

describe('views/AddExperience', () => {
  it('renders empty result', async () => {
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

    const { container } = render(<AddExperience />, mocks)

    await wait()

    expect(container).toMatchSnapshot()
  })
})
