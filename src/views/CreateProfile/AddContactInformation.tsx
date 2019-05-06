import React, { useState, FormEvent, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import Input from '../../components/Input'
import styled from '@emotion/styled'
import Button from '../../components/Button'
import { GET_CONTACT_CLIENT } from '../../graphql/resolvers/mutations/updateContactInformation'
import { useMutation, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const Form = styled.form`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
`

export const UPDATE_CONTACT_CLIENT = gql`
  mutation updateContactInformation($data: ProfileInput!) {
    updateContactInformation(data: $data) @client {
      name
      email
      telephone
    }
  }
`

const InputContainer = styled.div`
  position: relative;
  &:after {
    content: ' *';
    position: absolute;
    color: red;
    right: 0;
    padding: 5px;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateContactMutation({
      variables: {
        data: inputData,
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>Hur vill du bli nådd?</div>
      <InputContainer>
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
      </InputContainer>
      <InputContainer>
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
      </InputContainer>
      <div>
        <Input
          name="telephone"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('telephone', event.target.value)
          }
          placeholder="Telefonnummer..."
          value={inputData.telephone}
          width="100%"
        />
      </div>

      <Button type="submit" variant="primary">
        Spara
      </Button>
    </Form>
  )
}

export default AddContactInformation
