import { removeEducationClient } from '../removeEducation'
import { GET_EDUCATIONS_CLIENT } from 'graphql/shared/Queries'

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
        id: '1',
      },
      {
        programme: 'abc',
        id: '2',
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedEducationCache)
  writeQueryMock = jest.fn()

  education = {
    id: '1',
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
    removeEducationClient({}, { id: education.id }, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
    })
  })

  it('removes education', () => {
    removeEducationClient({}, { id: education.id }, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
      data: {
        educations: [
          {
            programme: 'abc',
            id: '2',
          },
        ],
      },
    })
  })

  it('returns true on success', () => {
    const result = removeEducationClient({}, { id: education.id }, cache)

    expect(result).toEqual(true)
  })
})
