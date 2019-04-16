import * as React from 'react'
import AddExperience, { GET_TAXONOMY_EXPERIENCES } from '../AddOccupation'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'

describe('views/AddExperience', () => {
  it('renders empty result', async () => {
    const { container } = render(<AddExperience />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders loading message', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_TAXONOMY_EXPERIENCES,
          variables: {
            q: 'Systemutvecklare',
            type: 'OCCUPATION_NAME',
          },
        },
        result: {
          data: {
            taxonomy: {
              __typename: 'TaxonomyDefaultResult',
              result: [
                {
                  term: 'Systemutvecklare',
                  taxonomyId: 'abc',
                  type: 'occupation-name',
                  parentId: 'abc',
                  __typename: 'TaxonomyDefaultResult',
                },
              ],
            },
          },
        },
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <AddExperience />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Sök yrken'), {
      target: { value: 'Systemutvecklare' },
    })

    expect(getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('should render with taxonomy query result', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_TAXONOMY_EXPERIENCES,
          variables: {
            q: 'Systemutvecklare',
            type: 'OCCUPATION_NAME',
          },
        },
        result: {
          data: {
            taxonomy: {
              __typename: 'TaxonomyDefaultResult',
              result: [
                {
                  term: 'Systemutvecklare',
                  taxonomyId: 'abc',
                  type: 'occupation-name',
                  parentId: 'abc',
                  __typename: 'TaxonomyDefaultResult',
                },
              ],
            },
          },
        },
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <AddExperience />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Sök yrken'), {
      target: { value: 'Systemutvecklare' },
    })

    await wait()

    expect(getByText('Systemutvecklare')).toBeInTheDocument()
  })
})
