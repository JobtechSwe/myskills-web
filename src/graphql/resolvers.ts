import { GET_EXPERIENCES_CLIENT } from '../views/CreateProfile/AddExperience'

export default {
  Mutation: {
    addExperience: (
      _: any,
      { experience }: any,
      { cache }: { cache: any }
    ): any => {
      const { experiences } = cache.readQuery({
        query: GET_EXPERIENCES_CLIENT,
      })

      const withoutDuplicates = (exp: any) =>
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
