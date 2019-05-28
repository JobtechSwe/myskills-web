import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import ReactCrop from 'react-image-crop'
import Button from 'components/Button'
import { Label } from 'components/Typography'
import Input from 'components/Input'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import gql from 'graphql-tag'
import Flex from 'components/Flex'
import Grid from 'components/Grid'
import profileImage from 'assets/illustrations/profile_image.svg'
import { FooterButton } from 'components/Layout/Registration'
import IllustrationHeader from 'components/IllustrationHeader'

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

const FileInput = styled(Input)`
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
`

const FileLabel = styled(Label)`
  cursor: pointer;
`

const ModalContainer = styled(Flex)`
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
`

interface UploadImageProps {
  buttonText: string
  onSubmit: () => void
  uploadImage: (args: any) => void
  imageData: any
}

interface UploadImageState {
  base64Image: string
  crop: ReactCrop.Crop
  imageRef: React.Ref<HTMLImageElement | null>
  isCropped: boolean
  src: string
}

const UploadImage: React.FC<RouteComponentProps & UploadImageProps> = ({
  buttonText,
  onSubmit,
  uploadImage,
  imageData,
}) => {
  const initialState: UploadImageState = {
    base64Image: imageData.image,
    crop: {
      x: 10,
      y: 10,
      width: 80,
      height: 80,
    },
    imageRef: null,
    isCropped: false,
    src: '',
  }

  const handleuploadImage = (imageString: string) => {
    uploadImage({
      variables: {
        image: {
          imageString,
        },
      },
    })
  }
  const [image, updateImage] = useState<UploadImageState>(initialState)

  const makeClientCrop = async (crop: ReactCrop.Crop) => {
    if (image.src && crop.width && crop.height) {
      const url = await getCroppedImg(image.imageRef, crop)
      updateImage({ ...image, base64Image: url })
    }
  }

  const getCroppedImg = async (
    image: any,
    crop: ReactCrop.Crop
  ): Promise<string> => {
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

  const selectImage = (isCropped: boolean) => {
    updateImage({ ...image, isCropped })
    handleuploadImage(image.base64Image)
  }

  const onCropChange = (crop: ReactCrop.Crop) => updateImage({ ...image, crop })
  const onCropComplete = (crop: ReactCrop.Crop) => makeClientCrop(crop)
  const onImageLoaded = (imageRef: any) =>
    updateImage({ ...image, imageRef, isCropped: false })
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <>
      <Global
        styles={css`
          body {
            overflow: ${image.src && !image.isCropped ? 'hidden' : 'auto'};
          }
        `}
      />
      <Grid alignItems="start">
        <IllustrationHeader
          description="Ladda upp en bild av dig själv för att göra din profil mer personlig."
          imageAltTag="Profilbild"
          imageFirst={false}
          imageSource={
            image.src || image.isCropped || image.base64Image
              ? image.base64Image
              : profileImage
          }
          title="Ladda upp en bild!"
        />
        <Flex alignItems="center" justifyContent="center">
          <FileLabel color="redOrange" mb={0} ml={0}>
            + Välj bild
            <FileInput onChange={onSelectFile} type="file" />
          </FileLabel>
        </Flex>
        {image.src && !image.isCropped && (
          <ModalContainer alignItems="center" justifyContent="center">
            <Grid bg="white" borderRadius={5} m="medium" p="small" width="100%">
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
              {!image.base64Image ||
                (image.src && !image.isCropped && (
                  <Button onClick={() => selectImage(true)} variant="primary">
                    Spara
                  </Button>
                ))}
            </Grid>
          </ModalContainer>
        )}
      </Grid>
      <FooterButton onClick={onSubmit} text={buttonText} />
    </>
  )
}

export default UploadImage
