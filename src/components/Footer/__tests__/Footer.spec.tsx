import * as React from 'react'
import Footer from '../Footer'
import { render } from '../../../utils/test-utils'

describe('components/Footer', () => {
  it('renders Footer component', async () => {
    const { container } = render(<Footer />)

    expect(container).toMatchSnapshot()
  })
})
