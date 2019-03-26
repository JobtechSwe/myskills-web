import React, { useState } from 'react'
import { useLocalStorage } from '@iteam/hooks'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Mutation, compose } from 'react-apollo'
import styled from '@emotion/styled'
import ExperienceList from './ExperienceList'
import { TaxonomyType } from '../../types'

const Input = styled.input`
  width: 30%;
  height: 50px;
  font-size: 28px;
`

const AddButton = styled.button`
  background: white;
  padding: 15px 25px;
`

const GET_EXPERIENCES = gql`
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

const ADD_EXPERIENCE = gql`
  mutation addExperience(
    $experience: ExperienceInput!
    $otherexperience: ExperienceInput!
  ) {
    first: addExperience(experience: $experience) {
      name
    }
    second: addExperience(experience: $otherexperience) {
      name
    }
  }
`

const arrayToJson = (old: any, data: any) =>
  JSON.stringify([...JSON.parse(old), data])

const AddExperience: React.FunctionComponent = () => {
  const [query, setQuery] = useState('')

  const [experiences, setExperiences] = useLocalStorage(
    'experiences',
    localStorage.getItem('experiences') || JSON.stringify([])
  )

  const { data, error, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
      type: TaxonomyType[TaxonomyType.OCCUPATION_NAME],
    },
  })

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
      <Input onChange={({ target }) => setQuery(target.value)} />
      <ul>
        {data.taxonomy && !loading && (
          <ExperienceList
            experiences={data.taxonomy.result}
            handleSetExperiences={handleSetExperiences}
          />
        )}

        {loading && <div>Loading...</div>}

        <Mutation
          mutation={ADD_EXPERIENCE}
          variables={{
            experience: JSON.parse(experiences)[0],
            otherexperience: JSON.parse(experiences)[1],
          }}
        >
          {(addExperience, { data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>
            }

            if (error) {
              return <p>That’s an error.</p>
            }

            return (
              <AddButton onClick={_e => addExperience()}>
                add experience
              </AddButton>
            )
          }}
        </Mutation>
      </ul>
    </>
  )
}

export default AddExperience
