import { GET_SKILLS_CLIENT } from '../addSkill'
import { addSkillClient } from '../addSkill'

let skill: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedSkillCache: any

beforeEach(() => {
  mockedSkillCache = {
    skills: [
      {
        term: 'cba',
      },
    ],
  }
  readQueryMock = jest.fn(() => mockedSkillCache)
  writeQueryMock = jest.fn()

  skill = {
    skill: {
      term: 'abc',
    },
  }
  cache = {
    cache: {
      readQuery: readQueryMock,
      writeQuery: writeQueryMock,
    },
  }
})

describe('resolvers/addSkill', () => {
  it('reads cache', () => {
    addSkillClient({}, skill, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_SKILLS_CLIENT,
    })
  })

  it('saves skill to cache', () => {
    addSkillClient({}, skill, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_SKILLS_CLIENT,
      data: {
        skills: [...mockedSkillCache.skills, skill.skill],
      },
    })
  })

  it('returns education', () => {
    expect(addSkillClient({}, skill, cache)).toEqual({
      term: 'abc',
    })
  })
})
