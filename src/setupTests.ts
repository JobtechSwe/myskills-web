import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'

// Temporary fix for an know issue
// https://github.com/trojanowski/react-apollo-hooks/pull/103
jest.mock('react-apollo-hooks/lib/internal/actHack', () => {
  const { act } = require('react-testing-library')
  return {
    __esModule: true,
    default: act,
  }
})

export default undefined
