import React, { useState, FormEvent, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Input from '../../components/Input'
import smartphoneLetter from '../../assets/illustrations/smarthpone_letter.svg'
import IllustrationHeader from '../../components/IllustrationHeader'
import { H1 } from '../../components/Typography'
import Flex from '../../components/Flex'
import Grid from '../../components/Grid'
import { GET_CONTACT_CLIENT } from '../../graphql/resolvers/mutations/updateContactInformation'
import { useMutation, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

export const UPDATE_CONTACT_CLIENT = gql`
  mutation updateContactInformation($data: ContactInput!) {
    updateContactInformation(data: $data) @client {
      name
      email
      telephone
    }
  }
`

const AddContactInformation: React.FC<RouteComponentProps> = () => {
  const updateContactMutation = useMutation(UPDATE_CONTACT_CLIENT)
  const { data: contactData } = useQuery(GET_CONTACT_CLIENT)
  const [inputData, setData] = useState({ name: '', email: '', telephone: '' })

  useEffect(() => setData(contactData.contact), [])

  const handleChange = (key: string, val: string) => {
    setData({ ...inputData, [key]: val })
  }

  const handleSubmit = (e: FormEvent): any => {
    updateContactMutation({
      variables: {
        data: inputData,
      },
    })
  }

  return (
    <RegistrationLayout
      childFn={handleSubmit}
      headerText="KONTAKT"
      nextBtnText="Spara CV med Egendata"
      nextPath="egenskaper"
      step={6}
    >
      <Grid alignContent="start">
        <IllustrationHeader
          description="Fyll i dina kontaktuppgifter för att kunna bli kontaktad av en arbetsgivare."
          imageAltTag="Telefon och brev"
          imageFirst={true}
          imageSource={smartphoneLetter}
          title="Hur vill du bli nådd?"
        />
        <Grid mt="small" gridGap={10}>
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
    </RegistrationLayout>
  )
}

export default AddContactInformation
