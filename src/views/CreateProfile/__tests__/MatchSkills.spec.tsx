import * as React from 'react'
import MatchSkills, { GET_RELATED_SKILLS } from '../MatchSkills'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent, act, waitForElement } from 'react-testing-library'
import { OntologyType } from '../../../generated/myskills.d'
import { GET_OCCUPATIONS_CLIENT } from '../../../graphql/resolvers/mutations/addOccupation'

describe('views/MatchSkills', () => {
  it('renders empty result', async done => {
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
        done()
      })
    })
  })

  it('should render with ontology related query result', async done => {
    const withResultsMock = [
      {
        request: {
          query: GET_OCCUPATIONS_CLIENT,
        },
        result: {
          data: {
            occupations: [
              {
                name: 'snickare',
                id: '123',
                type: OntologyType.Occupation,
                __typename: 'asdf',
              },
            ],
          },
        },
      },
      {
        request: {
          query: GET_RELATED_SKILLS,
          variables: {
            concepts: ['snickare'],
            limit: 5,
            type: OntologyType.Skill,
          },
        },
        result: {
          data: {
            ontologyRelated: {
              relations: [
                {
                  name: 'Händig',
                  score: 0.5,
                  id: '123',
                  type: OntologyType.Skill,
                  __typename: 'assdf',
                },
              ],
              __typename: 'asdf',
            },
          },
        },
      },
      {
        request: {
          query: GET_RELATED_SKILLS,
          variables: {
            concepts: [],
            limit: 5,
            type: OntologyType.Skill,
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
      const { container, getByText } = render(<MatchSkills />, withResultsMock)

      waitForElement(() => getByText(/händig/i)).then(() => {
        expect(container).toMatchSnapshot()
        done()
      })
    })
  })
})
