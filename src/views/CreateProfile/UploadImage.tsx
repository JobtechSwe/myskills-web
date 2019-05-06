import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import ReactCrop from 'react-image-crop'
import Button, { FloatingContinueButton } from '../../components/Button'
import { InternalLink } from '../../components/Link'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

export const UPLOAD_IMAGE_CLIENT = gql`
  mutation uploadImage($imageString: imageString!) {
    uploadImage(imageString: $imageString) @client {
      imageString
    }
  }
`

export const UPLOAD_IMAGE_API = gql`
  mutation uploadImage($imageString: imageString!) {
    uploadImage(imageString: $imageString) {
      imageString
    }
  }
`

export const GET_IMAGE = gql`
  query image {
    image @client
  }
`

const UploadImage: React.FC<RouteComponentProps> = props => {
  const { data } = useQuery(GET_IMAGE)
  const initialState = {
    src: '',
    crop: {
      x: 10,
      y: 10,
      width: 80,
      height: 80,
    },
    base64Image: data.image,
    imageRef: '',
    isCropped: false,
  }

  const uploadImage = useMutation(UPLOAD_IMAGE_CLIENT)

  const handleuploadImage = (imageString: string) => {
    uploadImage({
      variables: {
        imageString,
      },
    })
  }
  const [image, updateImage] = useState(initialState)

  const makeClientCrop = async (crop: any) => {
    if (image.src && crop.width && crop.height) {
      const url = await getCroppedImg(image.imageRef, crop)
      updateImage({ ...image, base64Image: url })
    }
  }

  const getCroppedImg = async (image: any, crop: any): Promise<string> => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )
    }

    return new Promise<any>(resolve => {
      resolve(canvas.toDataURL('image/jpeg'))
    })
  }

  const selectImage = (isCropped: any) => {
    updateImage({ ...image, isCropped })
    handleuploadImage(image.base64Image)
  }
  const onCropChange = (crop: any) => updateImage({ ...image, crop })
  const onCropComplete = (crop: any) => makeClientCrop(crop)
  const onImageLoaded = (imageRef: any) =>
    updateImage({ ...image, imageRef, isCropped: false })
  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          return updateImage({
            ...image,
            src: reader.result,
            isCropped: false,
          })
        }
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div>
      <div>
        <input onChange={onSelectFile} type="file" />
      </div>
      {!image.base64Image ||
        (image.src && !image.isCropped && (
          <Button onClick={(_e: any) => selectImage(true)} variant="primary">
            Select
          </Button>
        ))}
      {image.src && !image.isCropped && (
        <ReactCrop
          crop={image.crop}
          keepSelection={true}
          maxHeight={500}
          maxWidth={500}
          minHeight={150}
          minWidth={150}
          onChange={onCropChange}
          onComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
          src={image.src}
        />
      )}
      {image.base64Image && (image.isCropped || !image.src) && (
        <img alt="Crop" src={image.base64Image} style={{ maxWidth: '100%' }} />
      )}
      <InternalLink to="/skapa-cv/kompetenser">
        <FloatingContinueButton>Nästa</FloatingContinueButton>
      </InternalLink>
    </div>
  )
}
export default UploadImage
