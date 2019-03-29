import * as React from 'react'
import ButtonLink from '../ButtonLink'
import { render } from '../../../utils/test-utils'

describe('components/ButtonLink', () => {
  it('renders an anchor tag', async () => {
    const { container } = render(
      <ButtonLink fontSize="medium" href="/test">
        Link text
      </ButtonLink>
    )

    expect(container).toMatchSnapshot()
  })
})
