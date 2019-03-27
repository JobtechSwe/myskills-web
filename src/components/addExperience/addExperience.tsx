import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '@iteam/hooks'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Mutation, compose } from 'react-apollo'
import styled from '@emotion/styled'
import ExperienceList from './ExperienceList'
import { TaxonomyType } from '../../types'

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
// const generateGraphQlMutations = (experience: any, alias: string) => {

//   // TODO: Alias does not currently work with schema generation

//   // mutation addExperience($experience: ExperienceInput!) {
//   //   ${alias}: addExperience(experience: $experience){
//   //     term
//   //   }
//   // }
//   return gql`
//     mutation addExperience($experience: ExperienceInput!) {
//       addExperience(experience: $experience){
//         term
//       }
//     }
//   `
// }

// const CombineAddExperiences = (experiences: any) => {
//   const graphQlMutations = experiences.map((experience: any, i: any) =>
//     generateGraphQlMutations(experience, 'thing')
//   )
//   return graphQlMutations
// }

const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      name
    }
  }
`

const arrayToJson = (old: any, data: any) =>
  JSON.stringify([...JSON.parse(old), data])

const AddExperience: React.FunctionComponent = ({ mutate }: any) => {
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

  useEffect(() => {
    // console.log('combined: ', CombineAddExperiences(JSON.parse(experiences)))
    const first = mutate({
      variables: { experience: JSON.parse(experiences)[0] },
    })
    const second = mutate({
      variables: { experience: JSON.parse(experiences)[1] },
    })
    Promise.all([first, second]).then(
      (res): any => {
        // console.log('res: ', res)
      }
    )
  }, ['hej'])

  return (
    <>
      <InputLabel>Sök yrken:</InputLabel>
      <Input name="search" onChange={({ target }) => setQuery(target.value)} />

      {data.taxonomy && !loading && (
        <ExperienceList
          experiences={data.taxonomy.result}
          handleSetExperiences={handleSetExperiences}
        />
      )}

      {loading && <div>Loading...</div>}
    </>
  )
}

const AddExperienceWithMutation = graphql(ADD_EXPERIENCE)(AddExperience)

export default AddExperienceWithMutation
