import {
  createOccupationClient,
  GET_OCCUPATION_CLIENT,
} from '../createOccupation'
import { storageHelper } from '../../../../utils/helpers'

jest.mock('../../../../utils/helpers')

let occupation: any
let cache: any
let writeQueryMock: any

beforeEach(() => {
  writeQueryMock = jest.fn()

  occupation = {
    occupation: {
      term: 'Systemutvecklare',
      experience: {
        years: 5,
      },
    },
  }
  cache = {
    cache: {
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/createOccupation', () => {
  it('saves occupation to cache', () => {
    createOccupationClient({}, occupation, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATION_CLIENT,
      data: occupation,
    })
  })

  it('filters duplicates', () => {
    const duplicate = {
      occupation: {
        term: 'Förman',
      },
    }

    createOccupationClient({}, duplicate, cache)
    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATION_CLIENT,
      data: {
        occupation: {
          term: 'Förman',
        },
      },
    })
  })

  it('saves occupation in localStorage', () => {
    createOccupationClient({}, occupation, cache)
    const mockPayload = {
      type: 'occupation',
      data: occupation.occupation,
    }
    expect(storageHelper.set).toHaveBeenCalledWith(mockPayload)
  })

  it('returns experience', () => {
    expect(createOccupationClient({}, occupation, cache)).toEqual({
      term: 'Systemutvecklare',
      experience: {
        years: 5,
      },
    })
  })
})
