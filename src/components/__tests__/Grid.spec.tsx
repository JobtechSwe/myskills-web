import * as React from 'react'
import Grid from '../Grid'
import { render } from '../../utils/test-utils'

describe('components/Grid', () => {
  it('renders a Grid', async () => {
    const { container } = render(<Grid>Grid</Grid>)

    expect(container).toMatchSnapshot()
  })

  it('renders a Grid with props', async () => {
    const { container } = render(
      <Grid alignContent="center" gridGap={64} justifyContent="center" m="0">
        GridWithProps
      </Grid>
    )

    expect(container).toMatchSnapshot()
  })
})
