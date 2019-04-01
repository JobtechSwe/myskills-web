import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Experience } from '../../types'
import styled from '@emotion/styled'
import { TaxonomyType } from '../../types'
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

const InputLabel = styled.label`
  color: white;
  font-family: 'Arial';
  font-weight: bold;
  margin-bottom: 5px;
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

const AddExperience: React.FC<RouteComponentProps> = ({ mutate }: any) => {
  const [query, setQuery] = useState('')

  const { data, error, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType[TaxonomyType.OCCUPATION_NAME],
    },
  })

  const { data: clientExperiences } = useQuery(GET_EXPERIENCES_CLIENT)

  const handleSetExperience = (exp: Taxonomy.Result): MutationCallback =>
    mutate({
      mutation: ADD_EXPERIENCE_CLIENT,
      variables: {
        experience: {
          name: exp.term,
          years: '',
          taxonomyId: exp.taxonomyId,
        },
      },
    })

  return (
    <Wrapper>
      <InputLabel>Sök yrken:</InputLabel>
      <Input name="search" onChange={({ target }) => setQuery(target.value)} />
      {data.taxonomy && !loading && (
        <>
          <List>
            {data.taxonomy.result.map(
              (experience: Taxonomy.Result, i: number) => (
                <li key={i}>
                  <button
                    key={i}
                    onClick={() => handleSetExperience(experience)}
                  >
                    {experience.term}
                  </button>
                </li>
              )
            )}
          </List>
          {clientExperiences.experiences.length
            ? clientExperiences.experiences.map((e: Experience) => (
                <p key={e.taxonomyId}>{e.name}</p>
              ))
            : null}
        </>
      )}

      {loading && <div>Loading...</div>}
      {error && <div>Some error...</div>}
    </Wrapper>
  )
}

export default graphql<any>(ADD_EXPERIENCE)(AddExperience)
