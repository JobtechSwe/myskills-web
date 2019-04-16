import * as React from 'react'
import ExperienceList from '../ExperienceList'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'

describe('views/ExperienceList', () => {
  let experiences: any
  let addExperience: any

  beforeEach(() => {
    addExperience = jest.fn()
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
    const { container } = render(<ExperienceList list={[]} />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders experineces list', async () => {
    const { container } = render(<ExperienceList list={experiences} />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders experineces list with button', async () => {
    const { container } = render(
      <ExperienceList addExperience={addExperience} list={experiences} />
    )

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('should render with taxonomy query result', async () => {
    const { getByText } = render(
      <ExperienceList addExperience={addExperience} list={experiences} />
    )

    fireEvent.click(getByText(/java/i))

    await wait()

    expect(addExperience).toHaveBeenCalledWith({
      variables: {
        experience: { term: 'Javascript', taxonomyId: 'abc', years: '' },
      },
    })
  })
})
