import * as React from 'react'
import { render } from '../../../utils/test-utils'
import { wait } from 'react-testing-library'
import Home, { GET_CV } from '../Home'
import mockData from '../__fixtures__/profileData.js'

describe('views/profile/Home', () => {
  let withResultsMock: any

  beforeEach(() => {
    withResultsMock = [
      {
        request: {
          query: GET_CV,
        },
        result: {
          data: {
            ...mockData,
          },
        },
      },
    ]
  })

  xit('should render with profile data', async () => {
    const { getByText, container } = render(<Home />, withResultsMock)
    await wait()
    expect(getByText('Webbutvecklare')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
