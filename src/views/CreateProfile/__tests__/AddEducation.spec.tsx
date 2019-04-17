import * as React from 'react'
import AddEducation, { GET_TAXONOMY_EDUCATIONS } from '../AddEducation'
import { TaxonomyType } from '../../../generated/myskills.d'
import { render } from '../../../utils/test-utils'
import { wait, fireEvent } from 'react-testing-library'

const addEducationLevel1Mock = [
  {
    request: {
      query: GET_TAXONOMY_EDUCATIONS,
      variables: {
        q: 'Saknar',
        type: TaxonomyType.EducationLevel_1,
      },
    },
    result: {
      data: {
        taxonomy: {
          result: [
            {
              term: 'Saknar formell, grundläggande utbildning',
              taxonomyId: 'tWjg_Y7L_yXK',
              parentId: null,
              __typename: 'TaxonomyDefaultResult',
            },
          ],
          __typename: 'TaxonomyResponse',
        },
      },
    },
  },
]

const addEducationLevel2Mock = [
  {
    request: {
      query: GET_TAXONOMY_EDUCATIONS,
      variables: {
        q: 'gymnasial',
        type: TaxonomyType.EducationLevel_2,
      },
    },
    result: {
      data: {
        taxonomy: {
          result: [
            {
              term: 'Gymnasial utbildning tre år',
              taxonomyId: 'TtN8_grT_bFh',
              parentId: 'WQDT_QPv_eBn',
              __typename: 'TaxonomyDefaultResult',
            },
            {
              term: 'Gymnasial utbildning två år',
              taxonomyId: 'zVbF_9nM_u6g',
              parentId: 'WQDT_QPv_eBn',
              __typename: 'TaxonomyDefaultResult',
            },
            {
              term: 'Gymnasial utbildning kortare än två år',
              taxonomyId: 'r8ZH_fjD_GER',
              parentId: 'WQDT_QPv_eBn',
              __typename: 'TaxonomyDefaultResult',
            },
          ],
          __typename: 'TaxonomyResponse',
        },
      },
    },
  },
]

describe('views/AddEducation', () => {
  it('renders empty result', async () => {
    const { container } = render(<AddEducation />)

    await wait()

    expect(container).toMatchSnapshot()
  })

  it('renders loading message', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddEducation />,
      addEducationLevel1Mock
    )

    fireEvent.change(getByPlaceholderText('Utbildningar'), {
      target: { value: 'Sak' },
    })

    expect(getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('should render with taxonomy query result', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddEducation />,
      addEducationLevel1Mock
    )

    fireEvent.change(getByPlaceholderText('Utbildningar'), {
      target: { value: 'Saknar' },
    })

    await wait()

    expect(
      getByText('Saknar formell, grundläggande utbildning')
    ).toBeInTheDocument()
  })

  it('renders a different result when another education level is selected', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AddEducation />,
      addEducationLevel2Mock
    )

    fireEvent.blur(getByTestId('educationLevelSelect'), {
      target: { value: TaxonomyType.EducationLevel_2 },
    })

    await wait()

    fireEvent.change(getByPlaceholderText('Utbildningar'), {
      target: { value: 'gymnasial' },
    })

    await wait()

    expect(getByText('Gymnasial utbildning tre år')).toBeInTheDocument()
  })
})
