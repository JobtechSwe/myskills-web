import { storageHelper, StorageEntry } from '../helpers'

describe('#helpers/persistHelper', () => {
  const initialState = {
    experiences: [],
    skills: [],
    educations: [],
  }

  it('returns initialState properties and values if empty localStorage', () => {
    Storage.prototype.getItem = jest.fn((): any => null)

    expect(storageHelper.load(initialState)).toEqual(initialState)
  })

  it('returns with data from localstorage if any', () => {
    Storage.prototype.getItem = jest.fn((): any => JSON.stringify(['123']))

    expect(storageHelper.load(initialState)).toEqual({
      experiences: ['123'],
      skills: ['123'],
      educations: ['123'],
    })
  })

  it('saves to localstorage', () => {
    const mockStorage: any = {}

    Storage.prototype.setItem = jest.fn(
      (key: string, data: any): void => {
        mockStorage[key] = JSON.stringify(data)
      }
    )

    const mockPayload: StorageEntry = {
      type: 'experiences',
      data: [
        {
          name: '123',
          years: '',
          taxonomyId: 'abc',
        },
      ],
    }

    storageHelper.set(mockPayload)

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'experiences',
      JSON.stringify(mockPayload.data)
    )
  })
})
