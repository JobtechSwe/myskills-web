import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import ReactCrop from 'react-image-crop'

const UploadImage: React.FC<RouteComponentProps> = props => {
  const initialState = {
    src: '',
    crop: {
      x: 10,
      y: 10,
      width: 80,
      height: 80,
    },
  }
  const [image, uploadImage] = useState(initialState)

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

  const onCropChange = (crop: any) => {
    uploadImage({
      ...image,
      crop,
    })
  }
  const onCropComplete = () => console.log('onCropComplete')
  const onImageLoaded = (image: any) => console.log('onImageLoaded')

  return (
    <div>
      <div>
        <input onChange={onSelectFile} type="file" />
      </div>
      {image.src && (
        <ReactCrop
          crop={image.crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
          src={image.src}
        />
      )}
    </div>
  )
}
export default UploadImage
