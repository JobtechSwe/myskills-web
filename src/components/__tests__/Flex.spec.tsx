import * as React from 'react'
import Flex from '../Flex'
import { render } from '../../utils/test-utils'

describe('components/Flex', () => {
  it('renders a Flex', async () => {
    const { container } = render(<Flex>Flex</Flex>)

    expect(container).toMatchSnapshot()
  })

  it('renders a Flex with props', async () => {
    const { container } = render(
      <Flex alignContent="center" justifyContent="center">
        FlexWithProps
      </Flex>
    )

    expect(container).toMatchSnapshot()
  })
})
