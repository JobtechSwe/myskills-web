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
