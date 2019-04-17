import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { storageHelper } from '../../../utils/helpers'

export const GET_TRAITS_CLIENT = gql`
  query getTraits {
    traits @client
  }
`

export const addTrait = (
  _: any,
  { trait }: { trait: string },
  { cache }: { cache: InMemoryCache }
): string => {
  const { traits }: { traits: string[] } = cache.readQuery({
    query: GET_TRAITS_CLIENT,
  }) || { traits: [] }

  const withoutDuplicates = (traits: string[]): string[] =>
    traits.filter((e: string) => e !== trait)

  const updatedTraits = [...withoutDuplicates(traits), trait]

  cache.writeQuery({
    query: GET_TRAITS_CLIENT,
    data: { traits: updatedTraits },
  })

  storageHelper.set({
    type: 'traits',
    data: updatedTraits,
  })

  return trait
}
