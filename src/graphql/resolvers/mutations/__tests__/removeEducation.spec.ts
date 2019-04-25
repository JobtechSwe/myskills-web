import { removeEducationClient } from '../removeEducation'
import { GET_EDUCATIONS_CLIENT } from '../addEducation'

let education: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedEducationCache: any

beforeEach(() => {
  mockedEducationCache = {
    educations: [
      {
        programme: 'cba',
      },
      {
        programme: 'abc',
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedEducationCache)
  writeQueryMock = jest.fn()

  education = {
    programme: 'cba',
  }

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/removeEducation', () => {
  it('reads cache', () => {
    removeEducationClient({}, { education }, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
    })
  })

  it('removes education', () => {
    removeEducationClient({}, { education }, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
      data: {
        educations: [
          {
            programme: 'abc',
          },
        ],
      },
    })
  })

  it('returns the new educations list', () => {
    const result = removeEducationClient({}, { education }, cache)

    expect(result).toEqual([
      {
        programme: 'abc',
      },
    ])
  })
})
