import { addExperienceClient, GET_EXPERIENCES_CLIENT } from '../addExperience'
import { storageHelper } from '../../../../utils/helpers'

jest.mock('../../../../utils/helpers')

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
        __typename: 'Experience',
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedExperienceCache)
  writeQueryMock = jest.fn()

  experience = {
    experience: {
      name: 'Systemutvecklare',
      taxonomyId: 'abc',
      __typename: 'Experience',
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
    addExperienceClient({}, experience, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
    })
  })

  it('saves experience to cache', () => {
    addExperienceClient({}, experience, cache)

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
        term: 'Systemutvecklare',
        taxonomyId: 'cba',
        years: '2',
        __typename: 'Experience',
      },
    }

    addExperienceClient({}, duplicate, cache)
    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
      data: {
        experiences: [
          {
            term: 'Systemutvecklare',
            taxonomyId: 'cba',
            years: '2',
            __typename: 'Experience',
          },
        ],
      },
    })
  })

  it('saves experiences to localstorage', () => {
    addExperienceClient({}, experience, cache)
    const mockPayload = {
      type: 'experiences',
      data: [...mockedExperienceCache.experiences, experience.experience],
    }
    expect(storageHelper.set).toHaveBeenCalledWith(mockPayload)
  })

  it('returns experience', () => {
    expect(addExperienceClient({}, experience, cache)).toEqual({
      name: 'Systemutvecklare',
      taxonomyId: 'abc',
      __typename: 'Experience',
    })
  })
})
