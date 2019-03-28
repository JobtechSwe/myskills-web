import * as React from 'react'
import ButtonLink from '../ButtonLink'
import { render } from '../../../utils/test-utils'

describe('components/ButtonLink', () => {
  it('renders an Button', async () => {
    const { container } = render(
      <ButtonLink href="/test">Link text</ButtonLink>
    )

    expect(container).toMatchSnapshot()
  })

  it('renders an Button with variant prop', async () => {
    const { container } = render(
      <ButtonLink fontSize="medium" href="/test">
        Link text
      </ButtonLink>
    )

    expect(container).toMatchSnapshot()
  })
})
