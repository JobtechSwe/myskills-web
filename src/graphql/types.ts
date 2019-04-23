import {
  Experience,
  Education,
  Skill,
  Language,
  OntologyConceptResponse,
} from '../generated/myskills'
export interface ClientExperienceProps extends Experience {
  __typename: string
}
export interface ClientEducationProps extends Education {
  __typename: string
}
export interface ClientLanguageProps {
  language: Language
  __typename: string
}

export interface ClientOntologyConceptProps extends OntologyConceptResponse {
  __typename: string
}
