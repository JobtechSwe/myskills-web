export type Maybe<T> = T | null

export interface TaxonomyQueryInput {
  offset?: Maybe<number>

  limit?: Maybe<number>

  q?: Maybe<string>

  type?: Maybe<TaxonomyType>

  parentId?: Maybe<(Maybe<string>)[]>
}

export interface ExperienceInput {
  taxonomyId: string

  name?: Maybe<string>

  years: string
}

export interface EducationInput {
  taxonomyId: string

  name?: Maybe<string>
}

export interface ProfileInput {
  firstName: string

  lastName: string
}

export interface SkillInput {
  taxonomyId: string

  term: string

  type: string
}

export enum Language {
  Spanish = 'spanish',
  Swedish = 'swedish',
}

export enum TaxonomyType {
  Region = 'REGION',
  EducationField_1 = 'EDUCATION_FIELD_1',
  EducationField_2 = 'EDUCATION_FIELD_2',
  EducationField_3 = 'EDUCATION_FIELD_3',
  EducationLevel_1 = 'EDUCATION_LEVEL_1',
  EducationLevel_2 = 'EDUCATION_LEVEL_2',
  EducationLevel_3 = 'EDUCATION_LEVEL_3',
  Language = 'LANGUAGE',
  Municipality = 'MUNICIPALITY',
  OccupationField = 'OCCUPATION_FIELD',
  OccupationGroup = 'OCCUPATION_GROUP',
  OccupationName = 'OCCUPATION_NAME',
  Skill = 'SKILL',
  WorktimeExtent = 'WORKTIME_EXTENT',
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

/** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Date = any

/** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
export type Email = any

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any

/** A password string. Has to be at least 8 characters long. */
export type Password = any

/** The `Upload` scalar type represents a file upload. */
export type Upload = any

/** The UUID scalar type represents a UUID. */
export type Uuid = any

// ====================================================
// Documents
// ====================================================

export namespace Taxonomy {
  export type Variables = {
    q: string
    type?: Maybe<TaxonomyType>
  }

  export type Query = {
    __typename?: 'Query'

    taxonomy: Taxonomy
  }

  export type Taxonomy = {
    __typename?: 'TaxonomyResponse'

    result: (Maybe<Result>)[]
  }

  export type Result = {
    __typename?: TaxonomyDefaultResultInlineFragment['__typename']

    term: string

    taxonomyId: string

    type: string
  } & TaxonomyDefaultResultInlineFragment

  export type TaxonomyDefaultResultInlineFragment = {
    __typename?: 'TaxonomyDefaultResult'

    parentId: Maybe<string>
  }
}

export namespace AddExperience {
  export type Variables = {
    experience: ExperienceInput
  }

  export type Mutation = {
    __typename?: 'Mutation'

    addExperience: AddExperience
  }

  export type AddExperience = {
    __typename?: 'Experience'

    name: Maybe<string>
  }
}

export namespace ConsentApproved {
  export type Variables = {
    consentRequestId: string
  }

  export type Subscription = {
    __typename?: 'Subscription'

    consentApproved: ConsentApproved
  }

  export type ConsentApproved = {
    __typename?: 'ConsentResponse'

    accessToken: string
  }
}

export namespace Login {
  export type Variables = {}

  export type Mutation = {
    __typename?: 'Mutation'

    login: Login
  }

  export type Login = {
    __typename?: 'Login'

    id: string

    expires: string
  }
}
