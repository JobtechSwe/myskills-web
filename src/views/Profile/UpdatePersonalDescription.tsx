import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import WhoAmI from 'views/partials/WhoAmI'
import { Layout, Navigation } from 'components/Layout/Registration'
import {
  OntologyTextParseResponse,
  GetPersonalDescriptionQuery,
} from 'generated/myskills.d'
import { GET_PERSONAL_DESCRIPTION } from 'graphql/shared/Queries'
import { useQuery } from 'react-apollo-hooks'

const AddWhoAmI: React.FC<RouteComponentProps> = () => {
  const {
    data: { personalDescription },
    loading,
    error,
  } = useQuery<GetPersonalDescriptionQuery>(GET_PERSONAL_DESCRIPTION, {
    fetchPolicy: 'network-only',
  })

  const handleSubmit = (traits: OntologyTextParseResponse[]) => {
    navigate('/skapa-cv/egenskaper', { state: { traits } })
  }

  return (
    <Layout>
      <Navigation section="Person" />
      {error && <div>error...</div>}
      {!loading && personalDescription && (
        <WhoAmI
          buttonText="Fortsätt"
          onSubmit={handleSubmit}
          personalDescription={personalDescription}
        />
      )}
    </Layout>
  )
}

export default AddWhoAmI
