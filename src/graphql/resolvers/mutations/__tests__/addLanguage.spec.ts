import { addLanguage, GET_LANGUAGES_CLIENT } from '../addLanguage'
import { Language } from '../../../../generated/myskills.d'
import { storageHelper } from '../../../../utils/helpers'

jest.mock('../../../../utils/helpers')

let language: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedLanguageCache: any

beforeEach(() => {
  mockedLanguageCache = {
    languages: [Language.Swedish],
  }

  readQueryMock = jest.fn(() => mockedLanguageCache)
  writeQueryMock = jest.fn()

  language = {
    language: Language.Spanish,
  }

  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/addLanguage', () => {
  it('reads cache', () => {
    addLanguage({}, language, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_LANGUAGES_CLIENT,
    })
  })

  it('saves language to cache', () => {
    addLanguage({}, language, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_LANGUAGES_CLIENT,
      data: {
        languages: [Language.Swedish, Language.Spanish],
      },
    })
  })

  it('filters duplicates', () => {
    const duplicate = {
      language: Language.Swedish,
    }

    addLanguage({}, duplicate, cache)
    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_LANGUAGES_CLIENT,
      data: {
        languages: [Language.Swedish],
      },
    })
  })

  it('updates local storage', () => {
    addLanguage({}, language, cache)

    expect(storageHelper.set).toHaveBeenCalledWith({
      type: 'languages',
      data: ['swedish', 'spanish'],
    })
  })

  it('returns experience', () => {
    const result = addLanguage({}, language, cache)

    expect(result).toEqual('spanish')
  })
})
