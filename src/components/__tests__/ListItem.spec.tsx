import * as React from 'react'
import ListItem from '../ListItem'
import { render } from 'utils/test-utils'

describe('components/ListItem', () => {
  it('renders a ListItem', async () => {
    const { container } = render(<ListItem />)

    expect(container).toMatchSnapshot()
  })
})
