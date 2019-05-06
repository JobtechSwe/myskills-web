import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import gql from 'graphql-tag'
import { ContactInformationProps } from '../../client'

export const GET_CONTACT_CLIENT = gql`
  query getContact {
    contact @client {
      name
      email
      telephone
    }
  }
`

export const updateContactInformation = (
  _: any,
  { data }: { data: ContactInformationProps },
  { cache }: { cache: InMemoryCache }
): ContactInformationProps => {
  cache.writeQuery({
    query: GET_CONTACT_CLIENT,
    data: { contact: data },
  })

  storageHelper.set({
    type: 'contact',
    data,
  })

  return { ...data }
}
