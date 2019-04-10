import { addExperience, GET_EXPERIENCES_CLIENT } from '../addExperience'
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
        onboardingData: {
          experiences: [
            ...mockedExperienceCache.experiences,
            experience.experience,
          ],
          __typename: 'OnboardingData',
        },
      },
    })
  })

  it('filters duplicates', () => {
    const duplicate = {
      experience: {
        name: 'Systemutvecklare',
        taxonomyId: 'cba',
        __typename: 'Experience',
      },
    }

    addExperience({}, duplicate, cache)
    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EXPERIENCES_CLIENT,
      data: {
        onboardingData: {
          experiences: [
            {
              name: 'Systemutvecklare',
              taxonomyId: 'cba',
              __typename: 'Experience',
            },
          ],
          __typename: 'OnboardingData',
        },
      },
    })
  })

  it('saves experiences to localstorage', () => {
    addExperience({}, experience, cache)
    const mockPayload = {
      type: 'experiences',
      data: [...mockedExperienceCache.experiences, experience.experience],
    }
    expect(storageHelper.set).toHaveBeenCalledWith(mockPayload)
  })

  it('returns experience', () => {
    expect(addExperience({}, experience, cache)).toEqual({
      name: 'Systemutvecklare',
      taxonomyId: 'abc',
      __typename: 'Experience',
    })
  })
})
