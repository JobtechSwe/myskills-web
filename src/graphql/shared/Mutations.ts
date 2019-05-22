import gql from 'graphql-tag'

export const ADD_SKILL_CLIENT = gql`
  mutation addSkillClient($skill: SkillInput!) {
    addSkillClient(skill: $skill) @client {
      term
    }
  }
`

export const REMOVE_SKILL_CLIENT = gql`
  mutation removeSkillClient($skill: SkillInput!) {
    removeSkillClient(skill: $skill) @client {
      term
      id
    }
  }
`
