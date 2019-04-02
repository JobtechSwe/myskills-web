import * as React from 'react'
import Input from '../Input'
import { render } from '../../../utils/test-utils'

describe('components/Input', () => {
  it('renders an Input', async () => {
    const { container } = render(<Input name="search" />)

    expect(container).toMatchSnapshot()
  })
})
