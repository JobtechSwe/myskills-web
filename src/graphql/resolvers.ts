import { GET_EXPERIENCES_CLIENT } from '../views/CreateProfile/AddExperience'

const resolvers = {
  Mutation: {
    addExperience: (
      _: any,
      { experience }: any,
      { cache }: { cache: any }
    ): any => {
      const { experiences } = cache.readQuery({
        query: GET_EXPERIENCES_CLIENT,
      })

      const experiencesWithoutDuplicates = experiences.filter(
        (e: any) => e.taxonomyId !== experience.taxonomyId
      )

      const updatedExperiences = [...experiencesWithoutDuplicates, experience]

      cache.writeQuery({
        query: GET_EXPERIENCES_CLIENT,
        data: { experiences: updatedExperiences },
      })

      return experience
    },
  },
}

export default resolvers
