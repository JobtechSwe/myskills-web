import * as React from 'react'
import AddEducation from '../AddEducation'
import { render } from 'utils/test-utils'
import { wait } from 'react-testing-library'

jest.mock(
  'components/AddedEducations',
  () =>
    function mockedComponent() {
      return <div />
    }
)

describe('views/AddEducation', () => {
  it('renders empty result', async () => {
    const { container } = render(<AddEducation />)

    await wait()

    expect(container).toMatchSnapshot()
  })
})
