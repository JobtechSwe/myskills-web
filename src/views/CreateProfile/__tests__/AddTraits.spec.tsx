import * as React from 'react'
import AddTraits, { ADD_TRAIT } from 'views/partials/Traits'
import { GET_ONTOLOGY_CONCEPTS } from 'views/partials/Profession'
import { render } from 'utils/test-utils'
import { waitForElement, fireEvent } from 'react-testing-library'
import { OntologyType } from 'generated/myskills.d'
import { GET_TRAITS_CLIENT } from 'graphql/resolvers/mutations/addTrait'

describe('views/AddTraits', () => {
  let withResultsMock: any

  beforeEach(() => {
    withResultsMock = [
      {
        request: {
          query: GET_TRAITS_CLIENT,
        },
        result: {
          data: {
            traits: ['Glad'],
          },
        },
      },
      {
        request: {
          query: GET_ONTOLOGY_CONCEPTS,
          variables: {
            filter: 'Accepterande',
            type: OntologyType.Trait,
          },
        },
        result: {
          data: {
            __typename: 'OntologyConceptsResult',
            ontologyConcepts: [
              {
                id: 'daa4aa62-755d-56c9-a066-3ecaf4b77ee5',
                term: 'Accepterande',
                type: 'TRAIT',
                __typename: 'OntologyConceptResponse',
              },
            ],
          },
        },
      },
      {
        request: {
          query: GET_TRAITS_CLIENT,
        },
        result: {
          data: {
            traits: ['Glad', 'Accepterande'],
          },
        },
      },
    ]
  })

  it('should render with traits query result', async () => {
    const { getByPlaceholderText, getByText, getByTestId, container } = render(
      <AddTraits />,
      withResultsMock
    )

    const addTraitButton = await waitForElement(
      () => getByTestId('addTraitButton'),
      { container }
    )

    fireEvent.click(addTraitButton)

    const addTraitInput = await waitForElement(() =>
      getByPlaceholderText(/lägg till en egenskap/i)
    )

    fireEvent.change(addTraitInput, {
      target: { value: 'Accepterande' },
    })

    fireEvent.click(getByText('OK'))

    /* TODO: expect the newly added trait to actually be in the document */
    expect(getByTestId('addTraitButton')).toBeInTheDocument()
  })
})
