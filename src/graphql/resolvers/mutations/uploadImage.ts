import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { storageHelper } from '../../../utils/helpers'

export const GET_IMAGE_CLIENT = gql`
  query image {
    image @client
  }
`

export const uploadImage = (
  _: any,
  { imageString }: { imageString: string },
  { cache }: { cache: InMemoryCache }
): string => {
  cache.writeQuery({
    query: GET_IMAGE_CLIENT,
    data: { image: imageString },
  })

  storageHelper.set({
    type: 'image',
    data: imageString,
  })

  return imageString
}
