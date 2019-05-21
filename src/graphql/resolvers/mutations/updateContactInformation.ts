import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { Contact } from '../../client'

export const GET_CONTACT_CLIENT = gql`
  query getContact {
    contact @client {
      name
      email
      telephone
      __typename
    }
  }
`

export const updateContactInformation = (
  _: any,
  { data }: { data: Contact },
  { cache }: { cache: InMemoryCache }
): Contact => {
  cache.writeQuery({
    query: GET_CONTACT_CLIENT,
    data: { contact: data },
  })

  storageHelper.set({
    type: 'contact',
    data,
  })

  return { ...data, __typename: 'ContactInformation' }
}
