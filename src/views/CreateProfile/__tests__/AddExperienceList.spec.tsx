import * as React from 'react'
import AddExperienceList from '../AddExperienceList'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'

describe('views/AddExperienceList', () => {
  let experiences: any

  beforeEach(() => {
    experiences = [
      {
        term: 'Javascript',
        taxonomyId: 'abc',
      },
      {
        term: 'Java',
        taxonomyId: 'cda',
      },
    ]
  })

  it('renders empty list', async () => {
    const { container } = render(<AddExperienceList experiences={[]} />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders experineces list', async () => {
    const { container } = render(
      <AddExperienceList experiences={experiences} />
    )

    await wait()

    expect(container).toMatchSnapshot()
  })
})
