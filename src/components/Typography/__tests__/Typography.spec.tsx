import * as React from 'react'
import { H1, H2, H3, Paragraph } from '../Typography'
import { render } from '../../../utils/test-utils'

describe('components/Typography', () => {
  it('renders an H1', async () => {
    const { container } = render(<H1>Heading One</H1>)

    expect(container).toMatchSnapshot()
  })

  it('renders an H2', async () => {
    const { container } = render(<H2>Heading Two</H2>)

    expect(container).toMatchSnapshot()
  })

  it('renders an H3', async () => {
    const { container } = render(<H3>Heading Three</H3>)

    expect(container).toMatchSnapshot()
  })

  it('renders a Paragraph', async () => {
    const { container } = render(<Paragraph>Heading One</Paragraph>)

    expect(container).toMatchSnapshot()
  })
})
