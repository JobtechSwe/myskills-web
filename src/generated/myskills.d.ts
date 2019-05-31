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
  educations?: Maybe<Array<Maybe<Education>>>
  experiences?: Maybe<Array<Maybe<Experience>>>
  image?: Maybe<Scalars['String']>
  occupation?: Maybe<Occupation>
  traits?: Maybe<Array<Scalars['String']>>
  personalDescription?: Maybe<Scalars['String']>
  profile?: Maybe<Profile>
}

export type CvInput = {
  skills?: Maybe<Array<SkillInput>>
  educations?: Maybe<Array<EducationInput>>
  experiences?: Maybe<Array<ExperienceInput>>
  image?: Maybe<ImgInput>
  occupation?: Maybe<OccupationInput>
  traits?: Maybe<Array<Scalars['String']>>
  personalDescription?: Maybe<Scalars['String']>
  profile?: Maybe<ProfileInput>
}

export type EditEducationInput = {
  programme: Scalars['String']
  degree?: Maybe<Scalars['String']>
  school: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
  id: Scalars['String']
}

export type EditExperienceInput = {
  id: Scalars['String']
  employer: Scalars['String']
  sourceId?: Maybe<Scalars['String']>
  term: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type Education = {
  programme: Scalars['String']
  degree?: Maybe<Scalars['String']>
  school: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
  id: Scalars['String']
}

export type EducationInput = {
  programme: Scalars['String']
  degree?: Maybe<Scalars['String']>
  school: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type Experience = {
  id: Scalars['String']
  employer: Scalars['String']
  sourceId?: Maybe<Scalars['String']>
  term: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type ExperienceInput = {
  sourceId?: Maybe<Scalars['String']>
  term: Scalars['String']
  start: Scalars['String']
  employer: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type ImgFile = {
  imageString: Scalars['String']
}

export type ImgInput = {
  imageString: Scalars['String']
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
  /** Add user occupation */
  createOccupation: Occupation
  /** Add user trait */
  addTrait: Scalars['String']
  /** Add user description */
  addPersonalDescription: Scalars['String']
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
  /** Save Image as base64 string */
  uploadImage: Scalars['String']
  /** Edit education */
  editEducation: Education
  /** Edit experience */
  editExperience: Experience
  createOccupationClient?: Maybe<Occupation>
  addSkillClient: Skill
  removeSkillClient: Scalars['Boolean']
  addEducationClient: Education
  updateEducationClient: Education
  addExperienceClient: Experience
  updateExperienceClient: Experience
  addWhoAmI: Scalars['String']
  updateContactInformation: Profile
  removeEducationClient: Scalars['Boolean']
  removeExperienceClient: Scalars['Boolean']
  removeTrait: Scalars['String']
  removeOccupationClient: Scalars['Boolean']
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

export type MutationCreateOccupationArgs = {
  occupation: OccupationInput
}

export type MutationAddTraitArgs = {
  trait: Scalars['String']
}

export type MutationAddPersonalDescriptionArgs = {
  body: Scalars['String']
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

export type MutationUploadImageArgs = {
  image: ImgInput
}

export type MutationEditEducationArgs = {
  education: EditEducationInput
}

export type MutationEditExperienceArgs = {
  experience: EditExperienceInput
}

export type MutationCreateOccupationClientArgs = {
  occupation: OccupationInput
}

export type MutationAddSkillClientArgs = {
  skill: SkillInput
}

export type MutationRemoveSkillClientArgs = {
  id: Scalars['String']
}

export type MutationAddEducationClientArgs = {
  education: EducationInput
}

export type MutationUpdateEducationClientArgs = {
  education: EducationInput
}

export type MutationAddExperienceClientArgs = {
  experience: ExperienceInput
}

export type MutationUpdateExperienceClientArgs = {
  experience: ExperienceInput
}

export type MutationAddWhoAmIArgs = {
  whoAmI: Scalars['String']
}

export type MutationUpdateContactInformationArgs = {
  data: ProfileInput
}

export type MutationRemoveEducationClientArgs = {
  id: Scalars['String']
}

export type MutationRemoveExperienceClientArgs = {
  id: Scalars['String']
}

export type MutationRemoveTraitArgs = {
  trait: Scalars['String']
}

export type MutationRemoveOccupationClientArgs = {
  occupation: OccupationInput
}

export type Occupation = {
  term: Scalars['String']
  experience?: Maybe<OccupationExperience>
}

export type OccupationExperience = {
  years: Scalars['Int']
}

export type OccupationExperienceInput = {
  years: Scalars['Int']
}

export type OccupationInput = {
  term: Scalars['String']
  experience?: Maybe<OccupationExperienceInput>
}

export type OntologyConceptInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type OntologyConceptResponse = {
  id: Scalars['String']
  term: Scalars['String']
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
  term: Scalars['String']
  type: OntologyType
  terms?: Maybe<Array<Maybe<OntologyTerm>>>
}

export type OntologyInput = {
  filter: Scalars['String']
  type?: Maybe<OntologyType>
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
  term: Scalars['String']
  type: OntologyType
  score: Scalars['Float']
  details: OntologyRelationDetails
}

export type OntologyTerm = {
  term?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type OntologyTextParseResponse = {
  id: Scalars['String']
  term: Scalars['String']
  type: OntologyType
  terms: Array<Maybe<Scalars['String']>>
}

export enum OntologyType {
  Skill = 'SKILL',
  Occupation = 'OCCUPATION',
  Trait = 'TRAIT',
}

export type Profile = {
  name: Scalars['String']
  email: Scalars['String']
  telephone?: Maybe<Scalars['String']>
}

export type ProfileInput = {
  name: Scalars['String']
  email: Scalars['String']
  telephone?: Maybe<Scalars['String']>
}

export type Query = {
  /** Login an existing user */
  getLoginUrl: Login
  /** Gets a consent request */
  consent: Consent
  /** Get user languages */
  languages: Array<Language>
  /** Get user educations */
  educations: Array<Maybe<Education>>
  /** Get user experiences */
  experiences: Array<Maybe<Experience>>
  /** Get occupation */
  occupation: Occupation
  /** Get user profile */
  profile: Profile
  /** Get user skills */
  skills: Array<Maybe<Skill>>
  /** Get user personalDescription */
  personalDescription?: Maybe<Scalars['String']>
  /** Get user traits */
  traits: Array<Maybe<Scalars['String']>>
  /** Get occupation trivia */
  trivia: Trivia
  /** Get user image */
  image: Scalars['String']
  /** Get from taxonomy */
  taxonomy: TaxonomyResponse
  /** Get from ontology */
  ontologyConcepts: Array<Maybe<OntologyConceptResponse>>
  ontologyConcept: OntologyConceptTermResponse
  ontologyRelated: OntologyRelatedResponse
  ontologyTextParse: Array<Maybe<OntologyTextParseResponse>>
  isLoggedIn: Scalars['Boolean']
  whoAmI: Scalars['String']
}

export type QueryTriviaArgs = {
  occupation: Scalars['String']
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
  sourceId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
  id: Scalars['String']
}

export type SkillInput = {
  sourceId: Scalars['String']
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

export type Trivia = {
  info?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
}

export type GetProfessionAndContactQueryVariables = {}

export type GetProfessionAndContactQuery = { __typename?: 'Query' } & {
  profile: { __typename?: 'Profile' } & Pick<Profile, 'name'>
  occupation: { __typename?: 'Occupation' } & Pick<Occupation, 'term'>
}

export type GetExperiencesClientQueryVariables = {}

export type GetExperiencesClientQuery = { __typename?: 'Query' } & {
  experiences: Array<
    Maybe<
      { __typename?: 'Experience' } & Pick<
        Experience,
        'employer' | 'id' | 'term' | 'start' | 'end'
      >
    >
  >
}

export type GetLanguagesQueryVariables = {}

export type GetLanguagesQuery = { __typename?: 'Query' } & Pick<
  Query,
  'languages'
>

export type GetTraitsQueryVariables = {}

export type GetTraitsQuery = { __typename?: 'Query' } & Pick<Query, 'traits'>

export type GetWhoAmIQueryVariables = {}

export type GetWhoAmIQuery = { __typename?: 'Query' } & Pick<Query, 'whoAmI'>

export type OccupationQueryVariables = {}

export type OccupationQuery = { __typename?: 'Query' } & {
  occupation: { __typename?: 'Occupation' } & Pick<Occupation, 'term'> & {
      experience: Maybe<
        { __typename?: 'OccupationExperience' } & Pick<
          OccupationExperience,
          'years'
        >
      >
    }
}

export type GetProfileQueryVariables = {}

export type GetProfileQuery = { __typename?: 'Query' } & {
  profile: { __typename?: 'Profile' } & Pick<
    Profile,
    'name' | 'email' | 'telephone'
  >
}

export type AddEducationMutationVariables = {
  education: EducationInput
}

export type AddEducationMutation = { __typename?: 'Mutation' } & {
  addEducation: { __typename?: 'Education' } & Pick<Education, 'id'>
}

export type RemoveEducationMutationVariables = {
  id: Scalars['String']
}

export type RemoveEducationMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeEducation'
>

export type AddSkillClientMutationVariables = {
  skill: SkillInput
}

export type AddSkillClientMutation = { __typename?: 'Mutation' } & {
  addSkillClient: { __typename?: 'Skill' } & Pick<Skill, 'term'>
}

export type RemoveSkillClientMutationVariables = {
  id: Scalars['String']
}

export type RemoveSkillClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeSkillClient'
>

export type AddExperienceMutationVariables = {
  experience: ExperienceInput
}

export type AddExperienceMutation = { __typename?: 'Mutation' } & {
  addExperience: { __typename?: 'Experience' } & Pick<Experience, 'id'>
}

export type RemoveExperienceMutationVariables = {
  id: Scalars['String']
}

export type RemoveExperienceMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeExperience'
>

export type EditExperienceMutationVariables = {
  experience: EditExperienceInput
}

export type EditExperienceMutation = { __typename?: 'Mutation' } & {
  editExperience: { __typename?: 'Experience' } & Pick<Experience, 'id'>
}

export type EditEducationMutationVariables = {
  education: EditEducationInput
}

export type EditEducationMutation = { __typename?: 'Mutation' } & {
  editEducation: { __typename?: 'Education' } & Pick<Education, 'id'>
}

export type AddExperienceClientMutationVariables = {
  experience: ExperienceInput
}

export type AddExperienceClientMutation = { __typename?: 'Mutation' } & {
  addExperienceClient: { __typename?: 'Experience' } & Pick<
    Experience,
    'id' | 'employer' | 'end' | 'start' | 'term'
  >
}

export type RemoveExperienceClientMutationVariables = {
  id: Scalars['String']
}

export type RemoveExperienceClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeExperienceClient'
>

export type UpdateExperienceClientMutationVariables = {
  experience: ExperienceInput
}

export type UpdateExperienceClientMutation = { __typename?: 'Mutation' } & {
  updateExperienceClient: { __typename?: 'Experience' } & Pick<Experience, 'id'>
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

export type GetEducationsQueryVariables = {}

export type GetEducationsQuery = { __typename?: 'Query' } & {
  educations: Array<
    Maybe<
      { __typename?: 'Education' } & Pick<
        Education,
        'end' | 'id' | 'programme' | 'school' | 'start'
      >
    >
  >
}

export type GetEducationsClientQueryVariables = {}

export type GetEducationsClientQuery = { __typename?: 'Query' } & {
  educations: Array<
    Maybe<
      { __typename?: 'Education' } & Pick<
        Education,
        'id' | 'programme' | 'school' | 'start' | 'end'
      >
    >
  >
}

export type OntologyRelatedQueryVariables = {
  concepts?: Maybe<Array<Scalars['String']>>
  limit?: Maybe<Scalars['Int']>
  type: OntologyType
}

export type OntologyRelatedQuery = { __typename?: 'Query' } & {
  ontologyRelated: { __typename?: 'OntologyRelatedResponse' } & {
    relations: Array<
      Maybe<
        { __typename?: 'OntologyRelationResponse' } & Pick<
          OntologyRelationResponse,
          'term' | 'id' | 'score' | 'type'
        >
      >
    >
  }
}

export type GetSkillsClientQueryVariables = {}

export type GetSkillsClientQuery = { __typename?: 'Query' } & {
  skills: Array<
    Maybe<
      { __typename?: 'Skill' } & Pick<
        Skill,
        'term' | 'sourceId' | 'type' | 'id'
      >
    >
  >
}

export type GetOccupationClientQueryVariables = {}

export type GetOccupationClientQuery = { __typename?: 'Query' } & {
  occupation: { __typename?: 'Occupation' } & Pick<Occupation, 'term'> & {
      experience: Maybe<
        { __typename?: 'OccupationExperience' } & Pick<
          OccupationExperience,
          'years'
        >
      >
    }
}

export type GetExperiencesQueryVariables = {}

export type GetExperiencesQuery = { __typename?: 'Query' } & {
  experiences: Array<
    Maybe<
      { __typename?: 'Experience' } & Pick<
        Experience,
        'sourceId' | 'employer' | 'term' | 'start' | 'end' | 'id'
      >
    >
  >
}

export type GetPersonalDescriptionQueryVariables = {}

export type GetPersonalDescriptionQuery = { __typename?: 'Query' } & Pick<
  Query,
  'personalDescription'
>

export type TriviaQueryVariables = {
  occupation: Scalars['String']
}

export type TriviaQuery = { __typename?: 'Query' } & {
  trivia: { __typename?: 'Trivia' } & Pick<Trivia, 'info' | 'source'>
}

export type AddEducationClientMutationVariables = {
  education: EducationInput
}

export type AddEducationClientMutation = { __typename?: 'Mutation' } & {
  addEducationClient: { __typename?: 'Education' } & Pick<
    Education,
    'id' | 'programme' | 'school' | 'start' | 'end'
  >
}

export type RemoveEducationClientMutationVariables = {
  id: Scalars['String']
}

export type RemoveEducationClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeEducationClient'
>

export type UpdateEducationClientMutationVariables = {
  education: EducationInput
}

export type UpdateEducationClientMutation = { __typename?: 'Mutation' } & {
  updateEducationClient: { __typename?: 'Education' } & Pick<Education, 'id'>
}

export type ConsentQueryVariables = {}

export type ConsentQuery = { __typename?: 'Query' } & {
  consent: { __typename?: 'Consent' } & Pick<Consent, 'id' | 'url'>
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

export type SaveCvMutationVariables = {
  educations?: Maybe<Array<EducationInput>>
  experiences?: Maybe<Array<ExperienceInput>>
  image?: Maybe<ImgInput>
  occupation?: Maybe<OccupationInput>
  personalDescription?: Maybe<Scalars['String']>
  skills?: Maybe<Array<SkillInput>>
  traits?: Maybe<Array<Scalars['String']>>
  profile?: Maybe<ProfileInput>
}

export type SaveCvMutation = { __typename?: 'Mutation' } & {
  saveCV: { __typename?: 'CV' } & {
    skills: Maybe<
      Array<Maybe<{ __typename?: 'Skill' } & Pick<Skill, 'sourceId'>>>
    >
  }
}

export type GetCvClientQueryVariables = {}

export type GetCvClientQuery = { __typename?: 'Query' } & Pick<
  Query,
  'traits' | 'whoAmI' | 'image'
> & {
    skills: Array<
      Maybe<
        { __typename?: 'Skill' } & Pick<Skill, 'sourceId' | 'term' | 'type'>
      >
    >
    experiences: Array<
      Maybe<
        { __typename?: 'Experience' } & Pick<
          Experience,
          'employer' | 'start' | 'end' | 'term'
        >
      >
    >
    educations: Array<
      Maybe<
        { __typename?: 'Education' } & Pick<
          Education,
          'programme' | 'school' | 'start' | 'end'
        >
      >
    >
    occupation: { __typename?: 'Occupation' } & Pick<Occupation, 'term'> & {
        experience: Maybe<
          { __typename?: 'OccupationExperience' } & Pick<
            OccupationExperience,
            'years'
          >
        >
      }
    profile: { __typename?: 'Profile' } & Pick<
      Profile,
      'name' | 'email' | 'telephone'
    >
  }

export type UploadImageClientMutationVariables = {
  image: ImgInput
}

export type UploadImageClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'uploadImage'
>

export type UploadImageMutationVariables = {
  image: ImgInput
}

export type UploadImageMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'uploadImage'
>

export type LoginSubscriptionSubscriptionVariables = {
  loginRequestId: Scalars['String']
}

export type LoginSubscriptionSubscription = { __typename?: 'Subscription' } & {
  loginApproved: { __typename?: 'ConsentResponse' } & Pick<
    ConsentResponse,
    'accessToken'
  >
}

export type LoginQueryVariables = {}

export type LoginQuery = { __typename?: 'Query' } & {
  getLoginUrl: { __typename?: 'Login' } & Pick<Login, 'url' | 'sessionId'>
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

export type UpdateContactInformationMutationVariables = {
  data: ProfileInput
}

export type UpdateContactInformationMutation = { __typename?: 'Mutation' } & {
  updateContactInformation: { __typename?: 'Profile' } & Pick<
    Profile,
    'name' | 'email' | 'telephone'
  >
}

export type OntologyConceptsQueryVariables = {
  filter: Scalars['String']
  type?: Maybe<OntologyType>
}

export type OntologyConceptsQuery = { __typename?: 'Query' } & {
  ontologyConcepts: Array<
    Maybe<
      { __typename?: 'OntologyConceptResponse' } & Pick<
        OntologyConceptResponse,
        'id' | 'term' | 'type'
      >
    >
  >
}

export type CreateOccupationClientMutationVariables = {
  occupation: OccupationInput
}

export type CreateOccupationClientMutation = { __typename?: 'Mutation' } & {
  createOccupationClient: Maybe<
    { __typename?: 'Occupation' } & Pick<Occupation, 'term'> & {
        experience: Maybe<
          { __typename?: 'OccupationExperience' } & Pick<
            OccupationExperience,
            'years'
          >
        >
      }
  >
}

export type CreateOccupationApiMutationVariables = {
  occupation: OccupationInput
}

export type CreateOccupationApiMutation = { __typename?: 'Mutation' } & {
  createOccupation: { __typename?: 'Occupation' } & Pick<Occupation, 'term'> & {
      experience: Maybe<
        { __typename?: 'OccupationExperience' } & Pick<
          OccupationExperience,
          'years'
        >
      >
    }
}

export type RemoveOccupationClientMutationVariables = {
  occupation: OccupationInput
}

export type RemoveOccupationClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeOccupationClient'
>

export type IsLoggedInQueryVariables = {}

export type IsLoggedInQuery = { __typename?: 'Query' } & Pick<
  Query,
  'isLoggedIn'
>

export type AddTraitMutationVariables = {
  trait: Scalars['String']
}

export type AddTraitMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'addTrait'
>

export type RemoveTraitMutationVariables = {
  trait: Scalars['String']
}

export type RemoveTraitMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeTrait'
>

export type OntologyTextParseQueryVariables = {
  text: Scalars['String']
}

export type OntologyTextParseQuery = { __typename?: 'Query' } & {
  ontologyTextParse: Array<
    Maybe<
      { __typename?: 'OntologyTextParseResponse' } & Pick<
        OntologyTextParseResponse,
        'id' | 'term' | 'type' | 'terms'
      >
    >
  >
}

export type AddWhoAmIMutationVariables = {
  whoAmI: Scalars['String']
}

export type AddWhoAmIMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'addWhoAmI'
>

export type GetCvQueryVariables = {}

export type GetCvQuery = { __typename?: 'Query' } & Pick<
  Query,
  'image' | 'traits' | 'personalDescription'
> & {
    occupation: { __typename?: 'Occupation' } & Pick<Occupation, 'term'> & {
        experience: Maybe<
          { __typename?: 'OccupationExperience' } & Pick<
            OccupationExperience,
            'years'
          >
        >
      }
    experiences: Array<
      Maybe<
        { __typename?: 'Experience' } & Pick<
          Experience,
          'id' | 'employer' | 'sourceId' | 'term' | 'start' | 'end'
        >
      >
    >
    educations: Array<
      Maybe<
        { __typename?: 'Education' } & Pick<
          Education,
          'programme' | 'school' | 'start' | 'end' | 'id'
        >
      >
    >
    skills: Array<
      Maybe<
        { __typename?: 'Skill' } & Pick<
          Skill,
          'sourceId' | 'term' | 'type' | 'id'
        >
      >
    >
    profile: { __typename?: 'Profile' } & Pick<
      Profile,
      'name' | 'email' | 'telephone'
    >
  }

export type GetEducationsAndExperiencesQueryVariables = {}

export type GetEducationsAndExperiencesQuery = { __typename?: 'Query' } & {
  experiences: Array<
    Maybe<
      { __typename?: 'Experience' } & Pick<
        Experience,
        'employer' | 'term' | 'start' | 'end'
      >
    >
  >
  educations: Array<
    Maybe<
      { __typename?: 'Education' } & Pick<
        Education,
        'programme' | 'school' | 'start' | 'end'
      >
    >
  >
}

export type SkillsQueryVariables = {}

export type SkillsQuery = { __typename?: 'Query' } & {
  skills: Array<
    Maybe<
      { __typename?: 'Skill' } & Pick<
        Skill,
        'term' | 'type' | 'id' | 'sourceId'
      >
    >
  >
}

export type ConsentApprovedTempSubscriptionVariables = {
  consentRequestId: Scalars['String']
}

export type ConsentApprovedTempSubscription = {
  __typename?: 'Subscription'
} & {
  consentApproved: { __typename?: 'ConsentResponse' } & Pick<
    ConsentResponse,
    'accessToken'
  >
}
