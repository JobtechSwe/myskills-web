import { removeEducation } from '../removeEducation'
import { GET_EDUCATIONS_CLIENT } from '../addEducation'

let educationId: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedEducationCache: any

beforeEach(() => {
  mockedEducationCache = {
    educations: [
      {
        taxonomyId: 'cba',
      },
      {
        taxonomyId: 'abc',
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedEducationCache)
  writeQueryMock = jest.fn()

  educationId = 'cba'

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/removeEducation', () => {
  it('reads cache', () => {
    removeEducation({}, educationId, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
    })
  })

  it('removes education', () => {
    removeEducation({}, educationId, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
      data: {
        educations: [
          {
            taxonomyId: 'abc',
          },
        ],
      },
    })
  })

  it('returns the new educations list', () => {
    const result = removeEducation({}, educationId, cache)

    expect(result).toEqual([
      {
        taxonomyId: 'abc',
      },
    ])
  })
})
