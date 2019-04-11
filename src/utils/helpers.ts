import Cookies from 'js-cookie'
import { LocalStateProps } from '../graphql/client'
import {
  ExperienceInput,
  SkillInput,
  EducationInput,
  Language,
} from '../generated/myskills'

export const getCookie = (name: string) => Cookies.get(name)
export const setCookie = (
  name: string,
  value: string,
  options: object = {}
) => {
  Cookies.set(name, value, options)
}
export const removeCookie = (name: string) => {
  Cookies.remove(name)
}

export const redirect = (route: string) => (location.href = route)

interface StorageEntryProps {
  type: string
}

interface Educations extends StorageEntryProps {
  type: 'educations'
  data: EducationInput[]
}

interface Experiences extends StorageEntryProps {
  type: 'experiences'
  data: ExperienceInput[]
}

interface Skills extends StorageEntryProps {
  type: 'skills'
  data: SkillInput[]
}

interface Languages extends StorageEntryProps {
  type: 'languages'
  data: Language[]
}

export type StorageEntry = Educations | Experiences | Skills | Languages

export const storageHelper = {
  load: (initialState: LocalStateProps) =>
    Object.entries(initialState).reduce(
      (acc, [prop, val]) => ({
        ...acc,
        [prop]: JSON.parse(localStorage.getItem(prop) as string) || val,
      }),
      {} as LocalStateProps
    ),
  set: (payload: StorageEntry) =>
    localStorage.setItem(payload.type, JSON.stringify(payload.data)),
}
