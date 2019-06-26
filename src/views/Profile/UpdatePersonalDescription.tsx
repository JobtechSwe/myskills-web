import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import WhoAmI from 'views/partials/WhoAmI'
import { Layout, Navigation } from 'components/Layout/Registration'
import {
  OntologyTextParseResponse,
  GetPersonalDescriptionQuery,
  MutationAddPersonalDescriptionArgs,
  Mutation,
} from 'generated/myskills.d'
import { GET_PERSONAL_DESCRIPTION } from 'graphql/shared/Queries'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { ADD_PERSONAL_DESCRIPTION } from 'graphql/shared/Mutations'

const AddWhoAmI: React.FC<RouteComponentProps> = () => {
  const { data, loading, error } = useQuery<GetPersonalDescriptionQuery>(
    GET_PERSONAL_DESCRIPTION,
    {
      fetchPolicy: 'network-only',
    }
  )

  const updateWhoAmI = useMutation<
    Mutation['addPersonalDescription'],
    MutationAddPersonalDescriptionArgs
  >(ADD_PERSONAL_DESCRIPTION)

  const handleSubmit = (_: OntologyTextParseResponse[], description: string) =>
    updateWhoAmI({
      variables: { body: description },
      refetchQueries: [{ query: GET_PERSONAL_DESCRIPTION }],
    }).then(() => navigate('/profil'))

  return (
    <Layout>
      <Navigation section="Person" />
      {error && data && <div>error...</div>}
      {!loading && (
        <WhoAmI
          buttonText="Spara"
          onSubmit={handleSubmit}
          personalDescription={data.personalDescription}
        />
      )}
    </Layout>
  )
}

export default AddWhoAmI
