import gql from 'graphql-tag'

export const ADD_EDUCATION = gql`
  mutation addEducation($education: EducationInput!) {
    addEducation(education: $education) {
      id
    }
  }
`

export const REMOVE_EDUCATION = gql`
  mutation removeEducation($id: String!) {
    removeEducation(id: $id)
  }
`

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
    }
  }
`

export const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: EditExperienceInput!) {
    addExperience(experience: $experience) {
      id
    }
  }
`

export const REMOVE_EXPERIENCE = gql`
  mutation removeExperience($id: String!) {
    addExperience(id: $id)
  }
`

export const EDIT_EXPERIENCE = gql`
  mutation editExperience($id: String!) {
    addExperience(id: $id)
  }
`

export const EDIT_EDUCATION = gql`
  mutation editEducation($education: EditEducationInput!) {
    editEducation(education: $education) {
      id
    }
  }
`

export const ADD_EXPERIENCE_CLIENT = gql`
  mutation addExperienceClient($experience: ExperienceInput!) {
    addExperienceClient(experience: $experience) @client {
      sourceId
      employer
      end
      start
      term
    }
  }
`

export const REMOVE_EXPERIENCE_CLIENT = gql`
  mutation removeExperienceClient($experience: ExperienceInput!) {
    removeExperienceClient(experience: $experience) @client {
      sourceId
    }
  }
`

export const UPDATE_EXPERIENCE_CLIENT = gql`
  mutation updateExperienceClient($experience: ExperienceInput!) {
    updateExperienceClient(experience: $experience) @client {
      sourceId
    }
  }
`
