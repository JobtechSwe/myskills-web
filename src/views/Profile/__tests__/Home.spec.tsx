import * as React from 'react'
import { render } from '../../../utils/test-utils'
import { wait } from 'react-testing-library'
import Home, { GET_PROFILE } from '../Home'
import mockData from '../__fixtures__/profileData.js'

describe('views/profile/Home', () => {
  let withResultsMock: any

  beforeEach(() => {
    withResultsMock = [
      {
        request: {
          query: GET_PROFILE,
        },
        result: {
          data: {
            ...mockData,
          },
        },
      },
    ]
  })

  it('should render with profile data', async () => {
    const { getByText, container } = render(<Home />, withResultsMock)
    await wait()
    expect(getByText('Webbutvecklare')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
