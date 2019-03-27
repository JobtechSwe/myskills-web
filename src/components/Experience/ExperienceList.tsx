import React from 'react'
import styled from '@emotion/styled'
import { Mutation, Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) @client {
      name
    }
  }
`

const GET_EXPERIENCES = gql`
  {
    experiences @client {
      experience
    }
  }
`
const ExperienceList = ({ experiences, mutate }: any) => {
  // const addExperience = (experienceInput: any) => {
  //   mutate({
  //     variables: {
  //       experienceInput
  //     }
  //   })
  // }
  return (
    <>
      <List>
        {experiences
          .filter(({ taxonomyId }: { taxonomyId: string }) =>
            experiences.some(
              (y: { taxonomyId: string }) => y.taxonomyId === taxonomyId
            )
          )
          .map((c: { term: string }, i: number) => (
            <li key={i}>
              <Mutation mutation={ADD_EXPERIENCE} variables={c}>
                {(addExperience, { data, error, loading }) => {
                  return <button onClick={() => addExperience()}>add</button>
                }}
              </Mutation>
            </li>
          ))}
      </List>
      <Query query={GET_EXPERIENCES}>
        {({ data, error }) => {
          return data.experiences.map((e: any) => {
            return <p key={e}>{e.experience}</p>
          })
        }}
      </Query>
    </>
  )
}

export default ExperienceList
