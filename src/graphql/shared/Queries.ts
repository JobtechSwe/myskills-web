import gql from 'graphql-tag'

export const GET_TAXONOMY = gql`
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

export const GET_EDUCATIONS = gql`
  query getEducations {
    educations {
      end
      id
      programme
      school
      start
    }
  }
`

export const GET_EDUCATIONS_CLIENT = gql`
  query getEducations {
    educations @client {
      id
      programme
      school
      start
      end
    }
  }
`

export const GET_RELATED_SKILLS = gql`
  query ontologyRelated(
    $concepts: [String!]
    $limit: Int
    $type: OntologyType!
  ) {
    ontologyRelated(
      params: { concepts: $concepts, type: $type, limit: $limit }
    ) {
      relations {
        term
        id
        score
        type
      }
    }
  }
`

export const GET_SKILLS_CLIENT = gql`
  query getSkillsClient {
    skills @client {
      term
      sourceId
      type
    }
  }
`

export const GET_OCCUPATION_CLIENT = gql`
  query getOccupationClient {
    occupation @client {
      term
      experience {
        years
      }
    }
  }
`
