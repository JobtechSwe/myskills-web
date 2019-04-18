import * as React from 'react'
import ChooseProfession, { GET_ONTOLOGY_CONCEPTS } from '../ChooseProfession'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'
import { OntologyType } from '../../../generated/myskills.d'

describe('views/ChooseProfession', () => {
  xit('renders empty result', async () => {
    const { container } = render(<ChooseProfession />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  xit('renders loading message', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_ONTOLOGY_CONCEPTS,
          variables: {
            concepts: ['Förman'],
            limit: 5,
            type: OntologyType.Skill,
          },
        },
        result: {
          data: {
            ontologyRelated: {
              relations: [
                {
                  name: 'Test',
                  id: 'abc',
                  type: OntologyType,
                },
              ],
            },
          },
        },
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <ChooseProfession />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Yrkesroll eller yrkesområde'), {
      target: { value: 'Systemutvecklare' },
    })

    expect(getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('should render with taxonomy query result', async () => {
    const withResultsMock = [
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
            ontologyConcepts: [
              {
                name: 'Systemutvecklare',
                taxonomyId: 'abc',
                type: 'occupation-name',
                parentId: 'abc',
              },
            ],
          },
        },
      },
    ]

    const { getByPlaceholderText, getByText } = render(
      <ChooseProfession />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Yrkesroll eller yrkesområde'), {
      target: { value: 'Systemutvecklare' },
    })

    await wait(() => {
      expect(getByText('Systemutvecklare')).toBeInTheDocument()
    })
  })
})
