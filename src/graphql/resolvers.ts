import gql from 'graphql-tag'

// const GET_USER_AGE = gql`
//   query age {
//     age @client
//   }
// `
export const resolvers = {
  // Mutation: {
  //   setAge: (_: any, { val }: any, { cache }: any) => {
  //     const data = {
  //       age: val,
  //     }
  //     cache.writeQuery({ query: GET_USER_AGE, data })
  //     return val
  //   },
  // },
}
