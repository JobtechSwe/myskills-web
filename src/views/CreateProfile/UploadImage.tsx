import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import Image from 'views/partials/Image'
import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { GET_IMAGE_CLIENT } from 'graphql/resolvers/mutations'

export const UPLOAD_IMAGE_CLIENT = gql`
  mutation uploadImageClient($image: ImgInput!) {
    uploadImage(image: $image) @client
  }
`

export const UPLOAD_IMAGE_API = gql`
  mutation uploadImage($image: ImgInput!) {
    uploadImage(image: $image)
  }
`

const UploadImage: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/skapa-cv/kontakt')
  }
  const { data } = useQuery(GET_IMAGE_CLIENT)

  const uploadImage = useMutation(UPLOAD_IMAGE_CLIENT, {
    refetchQueries: [{ query: GET_IMAGE_CLIENT }],
  })
  return (
    <Layout>
      <Navigation section="Bild" step={5} />
      <Image
        buttonText="Fortsätt"
        imageData={data}
        onSubmit={handleSubmit}
        uploadImage={uploadImage}
      />
    </Layout>
  )
}

export default UploadImage
