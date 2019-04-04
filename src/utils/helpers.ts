import Cookies from 'js-cookie'
import { InitialStateProps } from '../graphql/client'
import { Experience, Skill, Education } from '../types'

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

export const persistClientStorageHelperGet = (
  initialState: InitialStateProps
) =>
  Object.entries(initialState).reduce(
    (acc, [prop, val]) => ({
      ...acc,
      [prop]: JSON.parse(localStorage.getItem(prop) as string) || val,
    }),
    {} as InitialStateProps
  )

type PersistClientStorageHelperSetProps = Experience[] | Skill[] | Education[]

export const persistClientStorageHelperSet = (
  key: string,
  data: PersistClientStorageHelperSetProps
): void => localStorage.setItem(key, JSON.stringify(data))
