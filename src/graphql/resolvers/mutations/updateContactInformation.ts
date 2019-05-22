import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from 'utils/helpers'
import gql from 'graphql-tag'
import { Profile } from 'generated/myskills'

export const GET_PROFILE_CLIENT = gql`
  query getProfile {
    profile @client {
      name
      email
      telephone
    }
  }
`

export const updateContactInformation = (
  _: any,
  { data }: { data: Profile },
  { cache }: { cache: InMemoryCache }
): Profile => {
  cache.writeQuery({
    query: GET_PROFILE_CLIENT,
    data: { profile: data },
  })

  storageHelper.set({
    type: 'profile',
    data,
  })

  return data
}
