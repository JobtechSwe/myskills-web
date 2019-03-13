import { deconstructJWT, handleErrors } from '../graphQL'
import { getCookie, redirect } from '../utils/helpers'

jest.mock('../utils/helpers')

describe('graphQL', () => {
  beforeEach(() => {
    window.location.assign = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('#handleErrors', () => {
    it('does nothing if no networkError', () => {
      handleErrors({
        graphQLErrors: [],
      })

      expect(redirect).not.toBeCalled()
    })

    it('should not break if no graphql errors', () => {
      (getCookie as any).mockReturnValue(null)

      handleErrors({
        networkError: {},
      })

      expect(redirect).not.toHaveBeenCalled()
    })

    it("redirects to start page if error and no token and it's a permission error", () => {
      (getCookie as any).mockReturnValue(null)

      handleErrors({
        graphQLErrors: [
          { message: "Cannot read property 'permissions' of undefined" },
        ],
        networkError: {
          statusCode: 503,
        },
      })

      expect(redirect).toHaveBeenCalledWith('/')
    })

    it('handles 503', () => {
      handleErrors({
        graphQLErrors: [],
        networkError: {
          statusCode: 503,
        },
      })

      expect(redirect).toHaveBeenCalledWith('/unavailable')
    })
  })

  describe('#deconstructJWT', () => {
    it('does not throw when the token is an array with 3 segments', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMTg0MjgifSwicGVybWlzc2lvbnMiOlsicHJvZmlsZV9yZWFkIiwicHJvZmlsZV93cml0ZSJdLCJleHAiOjE1MTc0Nzc2NjIsImlhdCI6MTUxNzQ3MDQ2Mn0.1e7wkagIZUvqfmtHiMNBOLNj_8ZcPfP9jgd2FJRbQAM'

      expect(() => deconstructJWT(token)).not.toThrow()
    })

    it('throws when the token is an array with 2 segments', () => {
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMTg0MjgifSwicGVybWlzc2lvbnMiOlsicHJvZmlsZV9yZWFkIiwicHJvZmlsZV93cml0ZSJdLCJleHAiOjE1MTc0Nzc2NjIsImlhdCI6MTUxNzQ3MDQ2Mn0'

      expect(() => deconstructJWT(invalidToken)).toThrow('Invalid JWT')
    })

    it('returns a parsed object if token is valid', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMTg0MjgifSwicGVybWlzc2lvbnMiOlsicHJvZmlsZV9yZWFkIiwicHJvZmlsZV93cml0ZSJdLCJleHAiOjE1MTc0Nzc2NjIsImlhdCI6MTUxNzQ3MDQ2Mn0.1e7wkagIZUvqfmtHiMNBOLNj_8ZcPfP9jgd2FJRbQAM'

      const expected = {
        data: { id: '18428' },
        exp: 1517477662,
        iat: 1517470462,
        permissions: ['profile_read', 'profile_write'],
      }

      expect(deconstructJWT(token)).toEqual(expected)
    })
  })
})
