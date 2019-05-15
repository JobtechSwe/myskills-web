import { uploadImage, GET_IMAGE_CLIENT } from '../uploadImage'

let imageInput: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedImageCache: any

beforeEach(() => {
  mockedImageCache = {
    image: 'yo',
  }
  readQueryMock = jest.fn(() => mockedImageCache)
  writeQueryMock = jest.fn()

  imageInput = {
    image: {
      imageString: 'imageString',
    },
  }

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/uploadImage', () => {
  it('saves image to cache', () => {
    uploadImage({}, imageInput, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_IMAGE_CLIENT,
      data: {
        imageString: 'imageString',
      },
    })
  })

  it('returns image', () => {
    expect(uploadImage({}, imageInput, cache)).toEqual('imageString')
  })
})
