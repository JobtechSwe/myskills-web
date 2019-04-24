import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType, TaxonomyDefaultResult } from '../../generated/myskills.d'
import { GET_TAXONOMY } from '../../graphql/shared/Queries'
import { RouteComponentProps } from '@reach/router'
import { Paragraph } from '../../components/Typography'
import List from '../../components/List'
import Grid from '../../components/Grid'
import Input from '../../components/Input'

export const ADD_EDUCATION_CLIENT = gql`
  mutation addEducationClient($education: EducationInput!) {
    addEducationClient(education: $education) @client {
      term
      taxonomyId
    }
  }
`

export const ADD_EDUCATION_API = gql`
  mutation addEducationApi($education: EducationInput!) {
    addEducation(education: $education) {
      __typename
      term
      taxonomyId
    }
  }
`

type EducationSelectAction = {
  type: 'FIELD' | 'LEVEL' | 'NAME'
  payload: string
}

type EducationSelectState = {
  field?: string
  level?: string
  name?: string
}

const educationSelectReducer = (
  state: EducationSelectState,
  action: EducationSelectAction
) => {
  switch (action.type) {
    case 'FIELD':
      return { ...state, field: action.payload }
    case 'LEVEL':
      return { ...state, level: action.payload }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

const EducationSelect = ({
  fields,
  levels,
}: {
  fields: TaxonomyDefaultResult[]
  levels: TaxonomyDefaultResult[]
}) => {
  const [state, dispatch] = React.useReducer(educationSelectReducer, {
    field: undefined,
    level: undefined,
    name: undefined,
  })

  const { field, level, name } = state

  return (
    <>
      {!field && !level && !name && <Paragraph>Fyll i inriktning</Paragraph>}

      {field && <Paragraph>Fyll i nivå</Paragraph>}

      {field && level && <Paragraph>Fyll i namn</Paragraph>}

      {field && level && name && <Paragraph>Alla fält ifyllda</Paragraph>}
    </>
  )
}

const AddEducation: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const [educationFieldOrType, setEducationFieldOrType] = useState(
    TaxonomyType.EducationLevel_3
  )
  const addEducationClient = useMutation(ADD_EDUCATION_CLIENT)

  const { data, error, loading } = useQuery(GET_TAXONOMY, {
    variables: {
      q: query,
      type: educationFieldOrType,
    },
    skip: !query,
  })

  return (
    <Grid>
      <select
        data-testid="educationLevelSelect"
        onBlur={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setEducationFieldOrType(event.target.value as TaxonomyType)
        }
      >
        <option value={TaxonomyType.EducationLevel_1}>
          {TaxonomyType.EducationLevel_1}
        </option>
        <option value={TaxonomyType.EducationLevel_2}>
          {TaxonomyType.EducationLevel_2}
        </option>
        <option value={TaxonomyType.EducationLevel_3}>
          {TaxonomyType.EducationLevel_3}
        </option>
      </select>

      <select
        data-testid="educationFieldSelect"
        onBlur={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setEducationFieldOrType(event.target.value as TaxonomyType)
        }
      >
        <option value={TaxonomyType.EducationField_1}>
          {TaxonomyType.EducationField_1}
        </option>
        <option value={TaxonomyType.EducationField_2}>
          {TaxonomyType.EducationField_2}
        </option>
        <option value={TaxonomyType.EducationField_3}>
          {TaxonomyType.EducationField_3}
        </option>
      </select>

      <Input
        name="search"
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(target.value)
        }
        placeholder="Utbildningsnivå"
      />

      {loading && <Paragraph>Loading...</Paragraph>}

      {error && (
        <Paragraph>
          There was an error while trying to fetch Educations
        </Paragraph>
      )}

      {data && data.taxonomy && (
        <List>
          {data.taxonomy.result.map((education: TaxonomyDefaultResult) => {
            return (
              <li key={education.taxonomyId}>
                {addEducationClient ? (
                  <button
                    onClick={() =>
                      addEducationClient({
                        variables: {
                          education: {
                            term: education.term,
                            taxonomyId: education.taxonomyId,
                          },
                        },
                      })
                    }
                  >
                    {education.term}
                  </button>
                ) : (
                  <p>{education.term}</p>
                )}
              </li>
            )
          })}
        </List>
      )}
    </Grid>
  )
}

export default AddEducation
