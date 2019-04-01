import { GET_EXPERIENCES_CLIENT } from '../views/CreateProfile/AddExperience'
import { ExperienceInput } from '../generated/myskills'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Experience } from '../types'

export default {
  Mutation: {
    addExperience: (
      _: any,
      { experience }: { experience: Experience },
      { cache }: { cache: InMemoryCache }
    ): Experience => {
      const { experiences }: any = cache.readQuery({
        query: GET_EXPERIENCES_CLIENT,
      })

      const withoutDuplicates = (exp: any): Experience[] =>
        exp.filter((e: any) => e.taxonomyId !== experience.taxonomyId)

      const updatedExperiences = [...withoutDuplicates(experiences), experience]

      cache.writeQuery({
        query: GET_EXPERIENCES_CLIENT,
        data: { experiences: updatedExperiences },
      })

      return experience
    },
  },
}
