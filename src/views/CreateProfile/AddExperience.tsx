import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '@iteam/hooks'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { graphql, Mutation, Query } from 'react-apollo'
import styled from '@emotion/styled'

import { TaxonomyType } from '../../types'
import { RouteComponentProps } from '@reach/router'

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
  mutation addExperience($experience: any) {
    addExperience(experience: $experience) @client
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
    experiences @client {
      term
      taxonomyId
    }
  }
`

const arrayToJson = (old: any, data: any) =>
  JSON.stringify([...JSON.parse(old), data])

const AddExperience: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')

  const [experiences, setExperiences] = useLocalStorage(
    'experiences',
    localStorage.getItem('experiences') || JSON.stringify([])
  )

  const { data, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType[TaxonomyType.OCCUPATION_NAME],
    },
  })

  // TODO(@all): Break this out to a separate function or handle it in a global-way
  const handleSetExperiences = (data: any) =>
    setExperiences(
      arrayToJson(experiences, {
        taxonomyId: data.taxonomyId,
        name: data.term,
        years: '2',
      })
    )

  return (
    <>
      <InputLabel>Sök yrken:</InputLabel>
      <Input name="search" onChange={({ target }) => setQuery(target.value)} />
      {/* <List>{data.taxonomy.result.map(items)}</List> */}
      {data.taxonomy && !loading && (
        <>
          <List>
            {data.taxonomy.result.map(
              (experience: { term: string; name: string }, i: number) => (
                <li key={i}>
                  {experience.name}
                  <Mutation
                    mutation={ADD_EXPERIENCE}
                    variables={{ experience }}
                  >
                    {(addExperience, { data, error, loading }) => {
                      return (
                        <button key={i} onClick={() => addExperience()}>
                          add
                        </button>
                      )
                    }}
                  </Mutation>
                </li>
              )
            )}
          </List>
          <Query query={GET_EXPERIENCES_CLIENT}>
            {({ data, error }) => {
              return data.experiences.map((e: any, i: number) => {
                return <p key={e.taxonomyId}>{e.term}</p>
              })
            }}
          </Query>
        </>
      )}

      {loading && <div>Loading...</div>}
    </>
  )
}

export default AddExperience
