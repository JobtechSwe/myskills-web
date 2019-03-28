import * as React from 'react'
import Button from '../Button'
import { render } from '../../../utils/test-utils'
import { wait } from 'react-testing-library'

describe('components/Button', () => {
  it('renders an Button', async () => {
    const { container } = render(<Button text="Click me!" />, [])

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders an Button with variant prop', async () => {
    const { container } = render(
      <Button text="Click me!" variant="primary" />,
      []
    )

    await wait()

    expect(container).toMatchSnapshot()
  })
})
