import * as React from 'react'
import List from '../List'
import { render } from 'utils/test-utils'

describe('components/List', () => {
  it('renders a List', async () => {
    const { container } = render(<List />)

    expect(container).toMatchSnapshot()
  })
})
