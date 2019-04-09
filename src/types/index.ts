export enum TaxonomyType {
  REGION,
  EDUCATION_FIELD_1,
  EDUCATION_FIELD_2,
  EDUCATION_FIELD_3,
  EDUCATION_LEVEL_1,
  EDUCATION_LEVEL_2,
  EDUCATION_LEVEL_3,
  LANGUAGE,
  MUNICIPALITY,
  OCCUPATION_FIELD,
  OCCUPATION_GROUP,
  OCCUPATION_NAME,
  SKILL,
  WORKTIME_EXTENT,
}

export type Experience = {
  name: string
  years?: string
  taxonomyId: string
  __typename: string
}
export type Skill = {
  name: string
  years?: string
  taxonomyId: string
}
export type Education = {
  name: string
  years?: string
  taxonomyId: string
}
