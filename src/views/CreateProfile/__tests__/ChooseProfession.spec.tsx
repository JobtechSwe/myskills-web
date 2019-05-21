import * as React from 'react'
import ChooseProfession, { GET_ONTOLOGY_CONCEPTS } from '../ChooseProfession'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'
import { OntologyType } from '../../../generated/myskills.d'

describe('views/ChooseProfession', () => {
  it('renders error message', async () => {
    const withErrorMock = [
      {
        request: {
          query: GET_ONTOLOGY_CONCEPTS,
          variables: {
            filter: 'Systemutvecklare',
            type: OntologyType.Occupation,
          },
        },
        result: {
          error: new Error('Error while trying to get concepts'),
        },
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <ChooseProfession />,
      withErrorMock
    )

    fireEvent.change(getByPlaceholderText('Yrkesroll eller yrkesområde'), {
      target: { value: 'Systemutvecklare' },
    })

    await wait()

    expect(getByText(/Error.../i)).toBeInTheDocument()
  })

  it('renders next button', async () => {
    const { getByText } = render(<ChooseProfession />)

    expect(getByText('Fortsätt')).toBeInTheDocument()
  })
})
