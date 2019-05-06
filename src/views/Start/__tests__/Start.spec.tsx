import * as React from 'react'
import Start from '../Start'
import { render } from '../../../utils/test-utils'
import { wait } from 'react-testing-library'

describe('views/Start', () => {
  it('renders Start', async () => {
    const { container } = render(<Start />)

    await wait()

    expect(container).toMatchSnapshot()
  })
})
