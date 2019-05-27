import { GET_EDUCATIONS_CLIENT } from 'graphql/shared/Queries'
import { addEducationClient } from '../addEducation'

let education: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedEducationCache: any

beforeEach(() => {
  mockedEducationCache = {
    educations: [
      {
        programme: 'programme',

        __typename: 'Education',
      },
    ],
  }
  readQueryMock = jest.fn(() => mockedEducationCache)
  writeQueryMock = jest.fn()

  education = {
    education: {
      programme: 'Gymnasieutbildning',

      __typename: 'Education',
    },
  }
  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

xdescribe('resolvers/addEducation', () => {
  it('reads cache', () => {
    addEducationClient({}, education, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
    })
  })

  it('saves education to cache', () => {
    addEducationClient({}, education, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_EDUCATIONS_CLIENT,
      data: {
        educations: [...mockedEducationCache.educations, education.education],
      },
    })
  })

  it('returns education', () => {
    expect(addEducationClient({}, education, cache)).toHave({
      programme: 'Gymnasieutbildning',
      __typename: 'Education',
    })
  })
})
