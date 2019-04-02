import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { TaxonomyType } from '../../types'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { Taxonomy } from '../../generated/myskills'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
`

const List = styled.ul`
  color: white;
  font-family: 'Arial';
  padding: 0;
  font-weight: bold;
  text-align: center;
  li {
    margin-bottom: 5px;
    list-style: none;
    transition: all 100ms ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`

const Input = styled.input`
  width: 80%;
  height: 30px;
  font-size: 28px;
  border-radius: 5px;
`

export const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      name
    }
  }
`

export const GET_EXPERIENCES = gql`
  query taxonomy($q: String!, $type: TaxonomyType) {
    taxonomy(params: { q: $q, type: $type }) {
      result {
        term
        taxonomyId
        type
        ... on TaxonomyDefaultResult {
          parentId
        }
      }
    }
  }
`

export const GET_EXPERIENCES_CLIENT = gql`
  query getExperiences {
    experiences @client
  }
`

export const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) @client
  }
`

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')

  const { data, error, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType[TaxonomyType.OCCUPATION_NAME],
    },
    skip: !query,
  })

  return (
    <Wrapper>
      <Input
        name="search"
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Sök yrken"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Some error...</div>}
      {data && data.taxonomy && (
        <List>
          {data.taxonomy.result.map(
            (experience: Taxonomy.Result, i: number) => (
              <li key={i}>
                <Mutation
                  mutation={ADD_EXPERIENCE_CLIENT}
                  variables={{
                    experience: {
                      name: experience.term,
                      years: '',
                      taxonomyId: experience.taxonomyId,
                    },
                  }}
                >
                  {(addExperience, { error, loading }) => {
                    if (loading) {
                      return <p>Loading...</p>
                    }

                    if (error) {
                      return <p>That’s an error.</p>
                    }

                    return (
                      <button onClick={() => addExperience()}>
                        {experience.term}
                      </button>
                    )
                  }}
                </Mutation>
              </li>
            )
          )}
        </List>
      )}
    </Wrapper>
  )
}

// export default graphql<any>(ADD_EXPERIENCE)(AddExperience)
export default AddExperience
