import * as React from 'react'
import Trivia from '../Trivia'
import { render } from 'utils/test-utils'

describe('components/Trivia', () => {
  it('renders Trivia', async () => {
    const { container } = render(
      <Trivia
        info="Yrkesprognosen för lärare ser god ut inom de närmaste åren."
        source="acme.se"
        title="Visste du att?"
      />
    )

    expect(container).toMatchSnapshot()
  })
})
