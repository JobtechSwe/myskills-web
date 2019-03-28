import * as React from 'react'
import Button from '../Button'
import { render } from '../../../utils/test-utils'

describe('components/Button', () => {
  it('renders an Button', async () => {
    const { container } = render(<Button text="Click me!" />)

    expect(container).toMatchSnapshot()
  })

  it('renders an Button with variant prop', async () => {
    const { container } = render(
      <Button text="Click me!" variant="secondary" />
    )

    expect(container).toMatchSnapshot()
  })
})
