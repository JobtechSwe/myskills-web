import * as React from 'react'
import MatchSkills, { GET_RELATED_SKILLS } from '../MatchSkills'
import { render } from '../../../utils/test-utils'
import { act, wait } from 'react-testing-library'
import { OntologyType } from '../../../generated/myskills.d'
import { GET_OCCUPATION_CLIENT } from '../../../graphql/resolvers/mutations/createOccupation'

describe('views/MatchSkills', () => {
  it('renders loading state', async done => {
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
    const { container } = render(<MatchSkills />, withResultsMock)
    act(() => {
      expect(container).toMatchSnapshot()
      done()
    })
  })

  it('should render with ontology related query result', () => {
    const withResultsMock = [
      {
        request: {
          query: GET_OCCUPATION_CLIENT,
        },
        result: {
          data: {
            occupation: {
              name: 'snickare',
              experience: {
                years: 5,
              },
              __typename: 'asdf',
            },
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

    const { getByText } = render(<MatchSkills />, withResultsMock)
    wait().then(() => {
      expect(getByText(/händig/i)).toBeInTheDocument()
    })
  })
})
