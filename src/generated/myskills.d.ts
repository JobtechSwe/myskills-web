type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** A password string. Has to be at least 8 characters long. */
  Password: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
  /** The UUID scalar type represents a UUID. */
  UUID: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Consent = {
  id: Scalars['String']
  url: Scalars['String']
  expires: Scalars['String']
}

export type ConsentResponse = {
  accessToken: Scalars['String']
}

export type Cv = {
  skills?: Maybe<Array<Maybe<Skill>>>
  education?: Maybe<Array<Maybe<Education>>>
  experience?: Maybe<Array<Maybe<Experience>>>
}

export type CvInput = {
  skills?: Maybe<Array<SkillInput>>
  education?: Maybe<Array<EducationInput>>
  experience?: Maybe<Array<ExperienceInput>>
}

export type Education = {
  id: Scalars['String']
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
}

export type EducationInput = {
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
}

export type Experience = {
  id: Scalars['String']
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
  years: Scalars['String']
}

export type ExperienceInput = {
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
  years: Scalars['String']
}

export enum Language {
  Spanish = 'spanish',
  Swedish = 'swedish',
}

export type Login = {
  url: Scalars['String']
  sessionId: Scalars['String']
}

export type Mutation = {
  /** Register consent for a user */
  consent: Consent
  /** Login an existing user */
  login: Login
  /** Add languages to user */
  addLanguage: Language
  /** Add experiences to user */
  addExperience: Experience
  /** Add education to user */
  addEducation: Education
  /** Add user profile */
  createProfile: Profile
  /** Add skill to user */
  addSkill: Skill
  /** Remove skill from user */
  removeSkill: Scalars['Boolean']
  /** Remove education from user */
  removeEducation: Scalars['Boolean']
  /** Remove experience from user */
  removeExperience: Scalars['Boolean']
  /** Remove language from user */
  removeLanguage: Scalars['Boolean']
  /** Save the complete cv to user */
  saveCV: Cv
  addExperienceClient?: Maybe<Experience>
}

export type MutationAddLanguageArgs = {
  language: Language
}

export type MutationAddExperienceArgs = {
  experience: ExperienceInput
}

export type MutationAddEducationArgs = {
  education: EducationInput
}

export type MutationCreateProfileArgs = {
  profile: ProfileInput
}

export type MutationAddSkillArgs = {
  skill: SkillInput
}

export type MutationRemoveSkillArgs = {
  id: Scalars['String']
}

export type MutationRemoveEducationArgs = {
  id: Scalars['String']
}

export type MutationRemoveExperienceArgs = {
  id: Scalars['String']
}

export type MutationRemoveLanguageArgs = {
  language: Language
}

export type MutationSaveCvArgs = {
  cv: CvInput
}

export type MutationAddExperienceClientArgs = {
  experience: ExperienceInput
}

export type OntologyConceptInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type OntologyConceptResponse = {
  id: Scalars['String']
  name: Scalars['String']
  type: OntologyType
}

export type OntologyConceptsInput = {
  type?: Maybe<OntologyType>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
}

export type OntologyConceptTermInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type OntologyConceptTermResponse = {
  id: Scalars['String']
  name: Scalars['String']
  type: OntologyType
  terms?: Maybe<Array<Maybe<OntologyTerm>>>
}

export type OntologyRelatedInput = {
  concepts?: Maybe<Array<Scalars['String']>>
  id?: Maybe<Array<Scalars['String']>>
  limit?: Maybe<Scalars['Int']>
  type: OntologyType
}

export type OntologyRelatedResponse = {
  count: Scalars['Int']
  concepts: Array<Maybe<OntologyConceptResponse>>
  relations: Array<Maybe<OntologyRelationResponse>>
}

export type OntologyRelationDetails = {
  word2Vec?: Maybe<Scalars['Float']>
}

export type OntologyRelationResponse = {
  id: Scalars['String']
  name: Scalars['String']
  type: OntologyType
  score: Scalars['Float']
  details: OntologyRelationDetails
}

export type OntologyTerm = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type OntologyTextParseResponse = {
  id: Scalars['String']
  name: Scalars['String']
  type: OntologyType
  terms: Array<Maybe<Scalars['String']>>
}

export enum OntologyType {
  Skill = 'SKILL',
  Occupation = 'OCCUPATION',
  Trait = 'TRAIT',
}

export type Profile = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
}

export type ProfileInput = {
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type Query = {
  /** Get user languages */
  languages: Array<Language>
  /** Get user educations */
  educations: Array<Maybe<Education>>
  /** Get user experiences */
  experiences: Array<Maybe<Experience>>
  /** Get user profile */
  profile: Profile
  /** Get user skills */
  skills: Array<Maybe<Skill>>
  /** Get from taxonomy */
  taxonomy: TaxonomyResponse
  /** Get from ontology */
  ontologyConcepts: Array<Maybe<OntologyConceptResponse>>
  ontologyConcept: OntologyConceptTermResponse
  ontologyRelated: OntologyRelatedResponse
  ontologyTextParse: Array<Maybe<OntologyTextParseResponse>>
  isLoggedIn?: Maybe<Scalars['Boolean']>
}

export type QueryTaxonomyArgs = {
  params?: Maybe<TaxonomyQueryInput>
}

export type QueryOntologyConceptsArgs = {
  params?: Maybe<OntologyConceptsInput>
}

export type QueryOntologyConceptArgs = {
  id: Scalars['String']
  params?: Maybe<OntologyConceptInput>
}

export type QueryOntologyRelatedArgs = {
  params?: Maybe<OntologyRelatedInput>
}

export type QueryOntologyTextParseArgs = {
  text: Scalars['String']
}

export type Skill = {
  id: Scalars['String']
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
}

export type SkillInput = {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
}

export type Subscription = {
  consentApproved: ConsentResponse
  loginApproved: ConsentResponse
}

export type SubscriptionConsentApprovedArgs = {
  consentRequestId: Scalars['String']
}

export type SubscriptionLoginApprovedArgs = {
  loginRequestId: Scalars['String']
}

export type TaxonomyDefaultResult = TaxonomyResult & {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
  parentId?: Maybe<Scalars['String']>
}

export type TaxonomyQueryInput = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  q?: Maybe<Scalars['String']>
  type?: Maybe<TaxonomyType>
  parentId?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type TaxonomyResponse = {
  search: TaxonomySearch
  total: Scalars['Int']
  result: Array<Maybe<TaxonomyResult>>
}

export type TaxonomyResult = {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
}

export type TaxonomySearch = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type TaxonomySkillResult = TaxonomyResult & {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
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

export type GetEducationsQueryVariables = {}

export type GetEducationsQuery = { __typename?: 'Query' } & {
  educations: Array<
    Maybe<{ __typename?: 'Education' } & Pick<Education, 'term' | 'taxonomyId'>>
  >
}

export type GetExperiencesQueryVariables = {}

export type GetExperiencesQuery = { __typename?: 'Query' } & {
  experiences: Array<
    Maybe<
      { __typename?: 'Experience' } & Pick<
        Experience,
        'term' | 'taxonomyId' | 'years'
      >
    >
  >
}

export type GetLanguagesQueryVariables = {}

export type GetLanguagesQuery = { __typename?: 'Query' } & Pick<
  Query,
  'languages'
>

export type GetSkillsQueryVariables = {}

export type GetSkillsQuery = { __typename?: 'Query' } & {
  skills: Array<
    Maybe<
      { __typename?: 'Skill' } & Pick<Skill, 'term' | 'taxonomyId' | 'type'>
    >
  >
}

export type TaxonomyQueryVariables = {
  q: Scalars['String']
  type?: Maybe<TaxonomyType>
}

export type TaxonomyQuery = { __typename?: 'Query' } & {
  taxonomy: { __typename?: 'TaxonomyResponse' } & {
    result: Array<
      Maybe<
        Pick<TaxonomyResult, 'term' | 'taxonomyId'> &
          ({ __typename?: 'TaxonomyDefaultResult' } & Pick<
            TaxonomyDefaultResult,
            'parentId'
          >)
      >
    >
  }
}

export type AddExperienceClientMutationVariables = {
  experience: ExperienceInput
}

export type AddExperienceClientMutation = { __typename?: 'Mutation' } & {
  addExperienceClient: Maybe<
    { __typename: 'Experience' } & Pick<
      Experience,
      'term' | 'years' | 'taxonomyId'
    >
  >
}

export type AddExperienceApiMutationVariables = {
  experience: ExperienceInput
}

export type AddExperienceApiMutation = { __typename?: 'Mutation' } & {
  addExperience: { __typename: 'Experience' } & Pick<
    Experience,
    'term' | 'years' | 'taxonomyId'
  >
}

export type IsLoggedInQueryVariables = {}

export type IsLoggedInQuery = { __typename?: 'Query' } & Pick<
  Query,
  'isLoggedIn'
>

export type ExperiencesQueryVariables = {}

export type ExperiencesQuery = { __typename?: 'Query' } & {
  experiences: Array<
    Maybe<
      { __typename?: 'Experience' } & Pick<Experience, 'term' | 'taxonomyId'>
    >
  >
}

export type LoginMutationVariables = {}

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'Login' } & Pick<Login, 'url' | 'sessionId'>
}

export type LoginApprovedSubscriptionVariables = {
  loginRequestId: Scalars['String']
}

export type LoginApprovedSubscription = { __typename?: 'Subscription' } & {
  loginApproved: { __typename?: 'ConsentResponse' } & Pick<
    ConsentResponse,
    'accessToken'
  >
}

export type ConsentApprovedSubscriptionVariables = {
  consentRequestId: Scalars['String']
}

export type ConsentApprovedSubscription = { __typename?: 'Subscription' } & {
  consentApproved: { __typename?: 'ConsentResponse' } & Pick<
    ConsentResponse,
    'accessToken'
  >
}

export type ConsentMutationVariables = {}

export type ConsentMutation = { __typename?: 'Mutation' } & {
  consent: { __typename?: 'Consent' } & Pick<Consent, 'id' | 'expires'>
}
