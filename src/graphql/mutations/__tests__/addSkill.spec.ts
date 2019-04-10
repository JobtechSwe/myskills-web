import { GET_SKILLS_CLIENT } from '../addSkill'
import { addSkill } from '../addSkill'

let skill: any
let cache: any
let readQueryMock: any
let writeQueryMock: any
let mockedSkillCache: any

beforeEach(() => {
  mockedSkillCache = {
    skills: [
      {
        taxonomyId: 'cba',
      },
    ],
  }
  readQueryMock = jest.fn(() => mockedSkillCache)
  writeQueryMock = jest.fn()

  skill = {
    skill: {
      name: 'Javascript',
      taxonomyId: 'abc',
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
    addSkill({}, skill, cache)

    expect(readQueryMock).toHaveBeenCalledWith({
      query: GET_SKILLS_CLIENT,
    })
  })

  it('saves skill to cache', () => {
    addSkill({}, skill, cache)

    expect(writeQueryMock).toHaveBeenCalledWith({
      query: GET_SKILLS_CLIENT,
      data: {
        skills: [...mockedSkillCache.skills, skill.skill],
      },
    })
  })

  it('returns education', () => {
    expect(addSkill({}, skill, cache)).toEqual({
      name: 'Javascript',
      taxonomyId: 'abc',
    })
  })
})
