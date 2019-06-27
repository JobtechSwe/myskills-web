import { Layout, Navigation } from 'components/Layout/Registration'
import {
  Query,
  Mutation,
  MutationCreateProfileArgs,
} from 'generated/myskills.d'
import { RouteComponentProps, navigate } from '@reach/router'
import ContactInformation from 'views/partials/ContactInformation'
import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_PROFILE } from 'graphql/shared/Queries'
import { UPDATE_CONTACT_INFORMATION } from 'graphql/shared/Mutations'

const AddContactInformation: React.FC<RouteComponentProps> = () => {
  const handleSubmit = () => {
    navigate('/profil')
  }

  const { data, loading } = useQuery<Query['profile'], {}>(GET_PROFILE, {
    fetchPolicy: 'network-only',
  })

  const updateContactInformation = useMutation<
    Mutation['createProfile'],
    MutationCreateProfileArgs
  >(UPDATE_CONTACT_INFORMATION, {
    refetchQueries: [{ query: GET_PROFILE }],
  })

  return (
    <Layout>
      <Navigation section="Kontakt" />
      {!loading && data && (
        <ContactInformation
          buttonText="Spara"
          contactInformation={data}
          onSubmit={handleSubmit}
          updateContactInformation={updateContactInformation}
        />
      )}
    </Layout>
  )
}

export default AddContactInformation
