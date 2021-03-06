import gql from 'graphql-tag'

export const ADD_SKILL = gql`
  mutation addSkill($skill: SkillInput!) {
    addSkill(skill: $skill) {
      term
    }
  }
`
export const REMOVE_SKILL = gql`
  mutation removeSkill($id: String!) {
    removeSkill(id: $id)
  }
`
export const ADD_TRAIT = gql`
  mutation addTrait($trait: String!) {
    addTrait(trait: $trait)
  }
`
export const REMOVE_TRAIT = gql`
  mutation removeTrait($trait: String!) {
    removeTrait(trait: $trait)
  }
`
export const UPDATE_CONTACT_INFORMATION = gql`
  mutation createProfile($profile: ProfileInput!) {
    createProfile(profile: $profile) {
      name
      email
      telephone
    }
  }
`

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
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      id
    }
  }
`

export const REMOVE_EXPERIENCE = gql`
  mutation removeExperience($id: String!) {
    removeExperience(id: $id)
  }
`

export const EDIT_EXPERIENCE = gql`
  mutation editExperience($experience: EditExperienceInput!) {
    editExperience(experience: $experience) {
      id
    }
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
      id
      employer
      end
      start
      term
    }
  }
`

export const REMOVE_EXPERIENCE_CLIENT = gql`
  mutation removeExperienceClient($id: String!) {
    removeExperienceClient(id: $id) @client
  }
`

export const UPDATE_EXPERIENCE_CLIENT = gql`
  mutation updateExperienceClient($experience: ExperienceInput!) {
    updateExperienceClient(experience: $experience) @client {
      id
    }
  }
`

export const ADD_WHO_AM_I = gql`
  mutation addWhoAmI($whoAmI: String!) {
    addWhoAmI(whoAmI: $whoAmI) @client
  }
`

export const ADD_PERSONAL_DESCRIPTION = gql`
  mutation addPersonalDescription($body: String!) {
    addPersonalDescription(body: $body)
  }
`
