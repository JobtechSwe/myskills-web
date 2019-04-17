import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { TaxonomyType, TaxonomyDefaultResult } from '../../generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import { Paragraph } from '../../components/Typography'
import List from '../../components/List'
import Grid from '../../components/Grid'
import Input from '../../components/Input'

export const GET_TAXONOMY_EDUCATIONS = gql`
  query taxonomy($q: String!, $type: TaxonomyType) {
    taxonomy(params: { q: $q, type: $type }) {
      result {
        term
        taxonomyId
        ... on TaxonomyDefaultResult {
          parentId
        }
      }
    }
  }
`

export const ADD_EDUCATION_CLIENT = gql`
  mutation addEducationClient($education: EducationInput!) {
    addEducationClient(education: $education) @client
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

const AddEducation: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const [educationType, setEducationType] = useState(
    TaxonomyType.EducationLevel_1
  )

  const addEducationClient = useMutation(ADD_EDUCATION_CLIENT)

  const { data, error, loading } = useQuery(GET_TAXONOMY_EDUCATIONS, {
    variables: {
      q: query,
      type: educationType,
    },
    skip: !query,
  })

  return (
    <Grid>
      <select
        data-testid="educationLevelSelect"
        onBlur={(event: React.ChangeEvent<HTMLSelectElement>) =>
          setEducationType(event.target.value as TaxonomyType)
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

      <Input
        name="search"
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(target.value)
        }
        placeholder="Utbildningar"
      />

      {loading && <Paragraph>Loading...</Paragraph>}

      {error && (
        <Paragraph>
          There was an error while trying to fetch Educations
        </Paragraph>
      )}

      {data && data.taxonomy && (
        <List>
          {data.taxonomy.result.map(
            (education: TaxonomyDefaultResult, i: number) => {
              return (
                <li key={i}>
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
            }
          )}
        </List>
      )}
    </Grid>
  )
}

export default AddEducation
