import * as React from 'react'
import MatchSkills, { GET_RELATED_SKILLS } from '../MatchSkills'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent, act } from 'react-testing-library'
import { OntologyType } from '../../../generated/myskills.d'

describe.only('views/MatchSkills', () => {
  it('renders empty result', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_RELATED_SKILLS,
          variables: {
            concepts: [],
            type: OntologyType.Skill,
            limit: 5,
          },
        },
        result: {
          data: {
            ontologyRelated: {
              relations: [],
              __typename: 'asdf',
            },
          },
        },
      },
    ]
    act(() => {
      const { container } = render(<MatchSkills />, withResultsMock)
      wait().then(() => {
        expect(container).toMatchSnapshot()
      })
    })
  })

  it('should render with ontology related query result', async () => {
    const withResultsMock = [
      {
        request: {
          query: GET_RELATED_SKILLS,
          variables: {
            concepts: [],
            type: OntologyType.Skill,
            limit: 5,
          },
        },
        result: {
          data: {
            ontologyRelated: {
              relations: [],
              __typename: 'asdf',
            },
          },
        },
      },
    ]
    const { getByPlaceholderText, getByText } = render(
      <MatchSkills />,
      withResultsMock
    )

    fireEvent.change(getByPlaceholderText('Yrkesroll eller yrkesområde'), {
      target: { value: 'Systemutvecklare' },
    })

    await wait()

    expect(getByText('Systemutvecklare')).toBeInTheDocument()
  })
})
