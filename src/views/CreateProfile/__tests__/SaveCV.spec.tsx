import * as React from 'react'
import { removeTypename } from 'views/CreateProfile/SaveCV'

describe('views/SaveCV', () => {
  describe('#removeTypename', () => {
    it('should deep omit typename', () => {
      const mockData = {
        skills: [
          {
            sourceId: 'f9a72116-f0ad-5e24-bc28-bf1eb7b0ef64',
            term: 'Yrkeslegitimation',
            type: 'SKILL',
            __typename: 'Skill',
          },
          {
            sourceId: '4e5c240b-72f2-5e92-890d-7850cd7923f4',
            term: 'Utbildningsbevis',
            type: 'SKILL',
            __typename: 'Skill',
          },
        ],
        educations: [] as any,
        traits: ['Duktig', 'Snäll'],
        occupation: {
          term: 'Försäljare',
          experience: {
            years: 2,
            __typename: 'OccupationExperience',
          },
          __typename: 'Occupation',
        },
        contact: {
          name: 'lasse kongo',
          email: 'lassekongo@example.com',
          telephone: '0123456677',
          __typename: 'ContactInformation',
        },
        language: [] as any,
      }

      const expected = {
        skills: [
          {
            sourceId: 'f9a72116-f0ad-5e24-bc28-bf1eb7b0ef64',
            term: 'Yrkeslegitimation',
            type: 'SKILL',
          },
          {
            sourceId: '4e5c240b-72f2-5e92-890d-7850cd7923f4',
            term: 'Utbildningsbevis',
            type: 'SKILL',
          },
        ],
        educations: [] as any,
        traits: ['Duktig', 'Snäll'],
        occupation: {
          term: 'Försäljare',
          experience: {
            years: 2,
          },
        },
        contact: {
          name: 'lasse kongo',
          email: 'lassekongo@example.com',
          telephone: '0123456677',
        },
        language: [] as any,
      }

      const result = removeTypename(mockData)

      expect(result).toEqual(expected)
    })
  })
})
