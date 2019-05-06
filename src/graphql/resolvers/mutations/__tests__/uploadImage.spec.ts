import { uploadImage, GET_IMAGE_CLIENT } from '../uploadImage'

let image: any
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

  image = { imageString: 'imageString' }

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/uploadImage', () => {
  it('saves image to cache', () => {
    uploadImage({}, image, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_IMAGE_CLIENT,
      data: {
        image: 'imageString',
      },
    })
  })

  it('returns image', () => {
    expect(uploadImage({}, image, cache)).toEqual('imageString')
  })
})
