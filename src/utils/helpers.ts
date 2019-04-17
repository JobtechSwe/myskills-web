import Cookies from 'js-cookie'
import { LocalStateProps } from '../graphql/client'
import {
  EducationInput,
  ExperienceInput,
  SkillInput,
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

interface Traits extends StorageEntryProps {
  type: 'traits'
  data: string[]
}

interface WhoAmI extends StorageEntryProps {
  type: 'whoAmI'
  data: string
}

export type StorageEntry = Educations | Experiences | Skills | Traits | WhoAmI

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
