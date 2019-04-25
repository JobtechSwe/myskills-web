import * as React from 'react'
import OccupationsList from '../OccupationsList'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'

describe('views/OccupationsList', () => {
  let occupations: any
  let addOccupation: any

  beforeEach(() => {
    addOccupation = jest.fn()
    occupations = [
      {
        name: 'Javascript',
        id: 'abc',
      },
      {
        name: 'Java',
        id: 'cda',
      },
    ]
  })

  it('renders empty list', async () => {
    const { container } = render(<OccupationsList occupations={[]} />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders experineces list', async () => {
    const { container } = render(<OccupationsList occupations={occupations} />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders experineces list with button', async () => {
    const { container } = render(
      <OccupationsList
        addExperience={addOccupation}
        occupations={occupations}
      />
    )

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('should render with taxonomy query result', async () => {
    const { getByText } = render(
      <OccupationsList
        addOccupation={addOccupation}
        occupations={occupations}
      />
    )

    fireEvent.click(getByText(/java/i))

    await wait()

    expect(addOccupation).toHaveBeenCalledWith({
      variables: {
        occupation: { name: 'Javascript', id: 'abc' },
      },
    })
  })
})
