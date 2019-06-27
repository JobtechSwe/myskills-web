import { Layout, Navigation } from 'components/Layout/Registration'
import { RouteComponentProps, navigate } from '@reach/router'
import React from 'react'
import Traits from 'views/partials/Traits'
import { useMutation, useQuery } from 'react-apollo-hooks'
import {
  Mutation,
  AddTraitMutationVariables,
  RemoveTraitMutationVariables,
  GetTraitsQuery,
} from 'generated/myskills'
import { ADD_TRAIT, REMOVE_TRAIT } from 'graphql/shared/Mutations'
import gql from 'graphql-tag'

const GET_TRAITS = gql`
  query traits {
    traits
  }
`
const UpdateTraits: React.FC<RouteComponentProps> = () => {
  const handleSubmit = (_traits: string[]) => {
    navigate('/profil')
  }

  const {
    data: { traits },
    loading,
  } = useQuery<GetTraitsQuery, {}>(GET_TRAITS, {
    fetchPolicy: 'network-only',
  })

  const addTrait = useMutation<Mutation['addTrait'], AddTraitMutationVariables>(
    ADD_TRAIT,
    {
      refetchQueries: [{ query: GET_TRAITS }],
    }
  )

  const removeTrait = useMutation<
    Mutation['removeTrait'],
    RemoveTraitMutationVariables
  >(REMOVE_TRAIT, {
    refetchQueries: [{ query: GET_TRAITS }],
  })

  return (
    <Layout>
      <Navigation section="Person" />
      {!loading && traits && (
        <Traits
          addTraitMutation={addTrait}
          buttonText="Spara"
          onSubmit={handleSubmit}
          removeTraitMutation={removeTrait}
          traits={traits}
        />
      )}
    </Layout>
  )
}

export default UpdateTraits
