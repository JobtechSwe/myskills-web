import { removeOccupationClient } from '../removeOccupation'
import { GET_OCCUPATION_CLIENT } from '../createOccupation'

let cache: any
let writeQueryMock: any

beforeEach(() => {
  writeQueryMock = jest.fn()

  cache = {
    cache: {
      readQuery: jest.fn(),
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/removeOccupation', () => {
  it('removes occupation', () => {
    removeOccupationClient({}, {}, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_OCCUPATION_CLIENT,
      data: {
        occupation: null,
      },
    })
  })

  it('returns true', () => {
    const result = removeOccupationClient({}, {}, cache)

    expect(result).toEqual({ occupation: null })
  })
})
