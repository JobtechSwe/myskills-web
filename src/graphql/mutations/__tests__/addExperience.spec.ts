import { addExperience, GET_EXPERIENCES_CLIENT } from '../addExperience'

let experience: any
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
    ],
  }
  readQueryMock = jest.fn(() => mockedExperienceCache)
  writeQueryMock = jest.fn()

  experience = {
    experience: {
      name: 'Systemutvecklare',
      taxonomyId: 'abc',
    },
  }
  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/addExperience', () => {
  it('reads cache', () => {
    addExperience({}, experience, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
    })
  })

  it('saves experience to cache', () => {
    addExperience({}, experience, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
      data: {
        experiences: [
          ...mockedExperienceCache.experiences,
          experience.experience,
        ],
      },
    })
  })

  it('filters duplicates', () => {
    const duplicate = {
      experience: {
        name: 'Systemutvecklare',
        taxonomyId: 'cba',
      },
    }

    addExperience({}, duplicate, cache)
    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
      data: {
        experiences: [
          {
            name: 'Systemutvecklare',
            taxonomyId: 'cba',
          },
        ],
      },
    })
  })

  it('returns experience', () => {
    expect(addExperience({}, experience, cache)).toEqual({
      name: 'Systemutvecklare',
      taxonomyId: 'abc',
    })
  })
})
