import { addOccupationClient, GET_OCCUPATIONS_CLIENT } from '../addOccupation'
import { storageHelper } from '../../../../utils/helpers'
import { OntologyType } from '../../../../generated/myskills.d'

jest.mock('../../../../utils/helpers')

let occupation: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedOccupationsCache: any

beforeEach(() => {
  mockedOccupationsCache = {
    occupations: [
      {
        name: 'Systemutvecklare',
        id: '123',
        type: OntologyType.Occupation,
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedOccupationsCache)
  writeQueryMock = jest.fn()

  occupation = {
    occupation: {
      name: 'Systemutvecklare',
      id: '321',
      type: OntologyType.Occupation,
    },
  }
  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/addOccupation', () => {
  it('reads cache', () => {
    addOccupationClient({}, occupation, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATIONS_CLIENT,
    })
  })

  it('saves occupation to cache', () => {
    addOccupationClient({}, occupation, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATIONS_CLIENT,
      data: {
        occupations: [
          ...mockedOccupationsCache.occupations,
          occupation.occupation,
        ],
      },
    })
  })

  it('filters duplicates', () => {
    const duplicate = {
      occupation: {
        name: 'Förman',
        id: '123',
        type: OntologyType.Occupation,
      },
    }

    addOccupationClient({}, duplicate, cache)
    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATIONS_CLIENT,
      data: {
        occupations: [
          {
            name: 'Förman',
            id: '123',
            type: OntologyType.Occupation,
          },
        ],
      },
    })
  })

  it('saves experiences to localstorage', () => {
    addOccupationClient({}, occupation, cache)
    const mockPayload = {
      type: 'occupations',
      data: [...mockedOccupationsCache.occupations, occupation.occupation],
    }
    expect(storageHelper.set).toHaveBeenCalledWith(mockPayload)
  })

  it('returns experience', () => {
    expect(addOccupationClient({}, occupation, cache)).toEqual({
      name: 'Systemutvecklare',
      id: '321',
      type: OntologyType.Occupation,
    })
  })
})
