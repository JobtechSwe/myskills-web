import * as React from 'react'
import Header from '../Header'
import { render } from '../../utils/test-utils'

describe('components/Header', () => {
  it('renders Header component', async () => {
    const { container } = render(<Header title="MySkills" />)

    expect(container).toMatchSnapshot()
  })
})
