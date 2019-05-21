import * as React from 'react'
import ChooseProfession, { GET_ONTOLOGY_CONCEPTS } from '../ChooseProfession'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'
import { OntologyType } from '../../../generated/myskills.d'
import { GET_OCCUPATION_CLIENT } from '../../../graphql/resolvers/mutations'

describe('views/ChooseProfession', () => {
  let withResultsMock: any

  beforeEach(() => {
    withResultsMock = [
      {
        request: {
          query: GET_ONTOLOGY_CONCEPTS,
          variables: {
            filter: 'Systemutvecklare',
            type: OntologyType.Occupation,
          },
        },
        result: {
          data: {
            __typename: 'OntologyConceptsResult',
            ontologyConcepts: [
              {
                term: 'Systemutvecklare',
                id: 'abc',
                type: 'occupation-name',
                __typename: 'OntologyConceptResult',
              },
            ],
          },
        },
      },
    ]
  })

  xit('renders empty result', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_OCCUPATION_CLIENT,
        },
        result: {
          data: {},
        },
      },
    ]

    const { container } = render(<ChooseProfession />, withResultsMock)

    await wait()

    expect(container).toMatchSnapshot()
  })

  xit('renders loading message', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ChooseProfession />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Yrkesroll eller yrkesområde'), {
      target: { value: 'Systemutvecklare' },
    })

    expect(getByText(/Loading.../i)).toBeInTheDocument()
  })

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

  xit('should render with taxonomy query result', async () => {
    const { getByPlaceholderText, getByText } = render(
      <ChooseProfession />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText(/Yrkesroll eller yrkesområde/i), {
      target: { value: 'Systemutvecklare' },
    })

    await wait()

    expect(getByText('Systemutvecklare')).toBeInTheDocument()
  })

  it('renders next button', async () => {
    const { getByText } = render(<ChooseProfession />)

    expect(getByText('Fortsätt')).toBeInTheDocument()
  })
})
