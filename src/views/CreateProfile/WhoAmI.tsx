import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import WhoAmI from 'views/partials/WhoAmI'
import { Layout, Navigation } from 'components/Layout/Registration'
import { OntologyTextParseResponse, GetWhoAmIQuery } from 'generated/myskills.d'
import { GET_WHO_AM_I_CLIENT } from 'graphql/resolvers/mutations/addWhoAmI'
import { useQuery } from 'react-apollo-hooks'
const AddWhoAmI: React.FC<RouteComponentProps> = () => {
  const {
    data: { whoAmI },
  } = useQuery<GetWhoAmIQuery>(GET_WHO_AM_I_CLIENT)

  const handleSubmit = (traits: OntologyTextParseResponse[]) => {
    navigate('/skapa-cv/egenskaper', { state: { traits } })
  }

  return (
    <Layout>
      <Navigation section="Person" step={5} />
      <WhoAmI
        buttonText="Fortsätt"
        onSubmit={handleSubmit}
        personalDescription={whoAmI}
      />
    </Layout>
  )
}

export default AddWhoAmI
