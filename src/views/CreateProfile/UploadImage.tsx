import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import ReactCrop from 'react-image-crop'
import Button, { FloatingContinueButton } from '../../components/Button'
import { InternalLink } from '../../components/Link'

const UploadImage: React.FC<RouteComponentProps> = props => {
  const initialState = {
    src: '',
    crop: {
      x: 10,
      y: 10,
      width: 80,
      height: 80,
    },
    croppedImageUrl: '',
    imageRef: '',
    isCropped: false,
  }
  const [image, uploadImage] = useState(initialState)

  const makeClientCrop = async (crop: any) => {
    if (image.src && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(image.imageRef, crop)
      uploadImage({ ...image, croppedImageUrl })
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

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject('Canvas is empty')
          return
        }

        resolve(window.URL.createObjectURL(blob))
      }, 'image/jpeg')
    })
  }

  const selectImage = (isCropped: any) => uploadImage({ ...image, isCropped })
  const onCropChange = (crop: any) => uploadImage({ ...image, crop })
  const onCropComplete = (crop: any) => makeClientCrop(crop)
  const onImageLoaded = (imageRef: any) =>
    uploadImage({ ...image, imageRef, isCropped: false })
  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          return uploadImage({
            ...image,
            src: reader.result,
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
      <Button onClick={(_e: any) => selectImage(true)} variant="primary">
        Select
      </Button>
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
      {image.croppedImageUrl && image.isCropped && (
        <img
          alt="Crop"
          src={image.croppedImageUrl}
          style={{ maxWidth: '100%' }}
        />
      )}
      <InternalLink to="/skapa-cv/kompetenser">
        <FloatingContinueButton>Nästa</FloatingContinueButton>
      </InternalLink>
    </div>
  )
}
export default UploadImage
