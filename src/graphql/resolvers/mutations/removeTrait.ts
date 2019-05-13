import { InMemoryCache } from 'apollo-cache-inmemory'
import { storageHelper } from '../../../utils/helpers'
import { GET_TRAITS_CLIENT } from './addTrait'

export const removeTrait = (
  _: any,
  { trait }: { trait: string },
  { cache }: { cache: InMemoryCache }
): string => {
  const { traits }: { traits: string[] } = cache.readQuery({
    query: GET_TRAITS_CLIENT,
  }) || { traits: [] }

  const updatedTraits = traits.filter(
    t => t.toLowerCase() !== trait.toLowerCase()
  )

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
