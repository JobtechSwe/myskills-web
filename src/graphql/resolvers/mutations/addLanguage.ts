import { InMemoryCache } from 'apollo-cache-inmemory'
import { Language } from 'generated/myskills'
import gql from 'graphql-tag'

export const GET_LANGUAGES_CLIENT = gql`
  query getLanguages {
    languages @client
  }
`

export const addLanguage = (
  _: any,
  { language }: { language: Language },
  { cache }: { cache: InMemoryCache }
): Language => {
  const { languages = [] }: any = cache.readQuery<{
    languages: Language[]
  }>({
    query: GET_LANGUAGES_CLIENT,
  })!

  const withoutDuplicates = (lang: Language[]): Language[] =>
    lang.filter((l: Language) => language !== l)

  const updatedLanguages = [...withoutDuplicates(languages), language]

  cache.writeQuery({
    query: GET_LANGUAGES_CLIENT,
    data: { languages: updatedLanguages },
  })

  return language
}
