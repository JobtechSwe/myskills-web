import { removeOccupation } from '../removeOccupation'
import { GET_OCCUPATIONS_CLIENT } from '../addOccupation'
import { OntologyType } from '../../../../generated/myskills.d'

let occupationId: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedOccupationCache: any

beforeEach(() => {
  mockedOccupationCache = {
    occupations: [
      {
        name: 'Systemutvecklare',
        id: '123',
        type: OntologyType.Occupation,
      },
      {
        name: 'Förman',
        id: '321',
        type: OntologyType.Occupation,
      },
    ],
  }

  readQueryMock = jest.fn(() => mockedOccupationCache)
  writeQueryMock = jest.fn()

  occupationId = '321'

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/removeOccupation', () => {
  it('reads cache', () => {
    removeOccupation({}, occupationId, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATIONS_CLIENT,
    })
  })

  it('removes occupation', () => {
    removeOccupation({}, occupationId, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATIONS_CLIENT,
      data: {
        occupations: [
          {
            name: 'Systemutvecklare',
            id: '123',
            type: OntologyType.Occupation,
          },
        ],
      },
    })
  })

  it('returns the new occupations list', () => {
    const result = removeOccupation({}, occupationId, cache)

    expect(result).toEqual([
      {
        name: 'Systemutvecklare',
        id: '123',
        type: OntologyType.Occupation,
      },
    ])
  })
})
