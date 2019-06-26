import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Input from 'components/Input'
import smartphoneLetter from 'assets/illustrations/smarthpone_letter.svg'
import IllustrationHeader from 'components/IllustrationHeader'
import Grid from 'components/Grid'
import { FooterButton } from 'components/Layout/Registration'
import { Profile, MutationCreateProfileArgs } from 'generated/myskills.d'
import { GET_PROFILE_CLIENT } from 'graphql/resolvers/mutations/updateContactInformation'
import { useQuery, MutationHookOptions } from 'react-apollo-hooks'
import gql from 'graphql-tag'

export const UPDATE_CONTACT_CLIENT = gql`
  mutation updateContactInformation($data: ProfileInput!) {
    updateContactInformation(data: $data) @client {
      name
      email
      telephone
    }
  }
`

interface AddContactInformationProps {
  buttonText: string
  onSubmit: () => void
  contactInformation: Profile
  updateContactInformation: (
    args: MutationHookOptions<{}, MutationCreateProfileArgs>
  ) => void
}

const AddContactInformation: React.FC<
  RouteComponentProps & AddContactInformationProps
> = ({ buttonText, onSubmit, updateContactInformation }) => {
  // const updateContactMutation = useMutation(UPDATE_CONTACT_CLIENT)
  const { data: profileData } = useQuery(GET_PROFILE_CLIENT)
  const [inputData, setData] = useState<Profile>({
    email: '',
    name: '',
    telephone: '',
  })

  useEffect(() => setData(profileData.profile), [profileData.profile])

  const handleChange = (key: string, val: string) => {
    setData({ ...inputData, [key]: val })
  }

  const handleSubmit = () => {
    updateContactInformation({
      variables: {
        profile: {
          name: inputData.name,
          email: inputData.email,
          telephone: inputData.telephone,
        },
      },
    })

    onSubmit()
  }

  return (
    <>
      <Grid alignContent="start">
        <IllustrationHeader
          description="Fyll i dina kontaktuppgifter för att kunna bli kontaktad av en arbetsgivare."
          imageAltTag="Telefon och brev"
          imageFirst={true}
          imageSource={smartphoneLetter}
          title="Hur vill du bli nådd?"
        />
        <Grid gridGap={10} mt="small">
          <Input
            name="name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('name', event.target.value)
            }
            placeholder="För- och efternamn..."
            required
            value={inputData.name}
            width="100%"
          />
          <Input
            name="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('email', event.target.value)
            }
            placeholder="E-post..."
            required
            type="email"
            value={inputData.email}
            width="100%"
          />
          <Input
            name="phone"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('telephone', event.target.value)
            }
            placeholder="Telefonnummer..."
            value={inputData.telephone}
            width="100%"
          />
        </Grid>
      </Grid>
      <FooterButton onClick={handleSubmit} text={buttonText} />
    </>
  )
}

export default AddContactInformation
