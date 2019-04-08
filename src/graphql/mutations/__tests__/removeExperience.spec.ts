import { removeExperience } from '../removeExperience'
import { GET_EXPERIENCES_CLIENT } from '../addExperience'

let experienceId: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedExperienceCache: any

beforeEach(() => {
  mockedExperienceCache = {
    experiences: [
      {
        taxonomyId: 'cba',
      },
      {
        taxonomyId: 'abc',
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedExperienceCache)
  writeQueryMock = jest.fn()

  experienceId = 'cba'

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/removeExperience', () => {
  it('reads cache', () => {
    removeExperience({}, experienceId, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
    })
  })

  it('removes experience', () => {
    removeExperience({}, experienceId, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
      data: {
        experiences: [
          {
            taxonomyId: 'abc',
          },
        ],
      },
    })
  })

  it('returns the new experiences list', () => {
    const result = removeExperience({}, experienceId, cache)

    expect(result).toEqual([
      {
        taxonomyId: 'abc',
      },
    ])
  })
})
