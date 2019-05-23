import React, { useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {
  GetOccupationClientQuery,
  GetOccupationClientQueryVariables,
  Occupation,
  OntologyType,
  OntologyConceptResponse,
} from 'generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import Grid from 'components/Grid'
import Input from 'components/Input'
import IllustrationHeader from 'components/IllustrationHeader'
import suitcaseIllustration from 'assets/illustrations/suitcase.svg'
import ListItem from 'components/ListItem'
import { SearchList } from 'components/List'
import { css, Global } from '@emotion/core'
import Downshift from 'downshift'
import { highlightMarked } from 'utils/helpers'
import { FooterButton } from 'components/Layout/Registration'
import { GET_OCCUPATION_CLIENT } from 'graphql/resolvers/mutations/createOccupation'
import close from 'assets/icons/close_black.svg'
import styled from '@emotion/styled'

const SearchInput = styled(Input)`
  width: 100%;
`

const FakeInput = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  border-radius: 5px;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.default};
  justify-content: space-between;
  padding: 12px;
`

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`

export const GET_ONTOLOGY_CONCEPTS = gql`
  query ontologyConcepts($filter: String!, $type: OntologyType) {
    ontologyConcepts(params: { filter: $filter, type: $type }) {
      id
      term
      type
    }
  }
`

export const CREATE_OCCUPATION_CLIENT = gql`
  mutation createOccupationClient($occupation: OccupationInput!) {
    createOccupationClient(occupation: $occupation) @client {
      term
      experience {
        years
      }
    }
  }
`

export const CREATE_OCCUPATION_API = gql`
  mutation createOccupationApi($occupation: OccupationInput!) {
    createOccupation(occupation: $occupation) {
      term
      experience {
        years
      }
    }
  }
`

export const REMOVE_OCCUPATION_CLIENT = gql`
  mutation removeOccupationClient($occupation: OccupationInput!) {
    removeOccupationClient(occupation: $occupation) @client {
      term
    }
  }
`

/*
  (always: true) is currently unreliable but Apollo reports bug is fixed in 2.6.0
  https://github.com/apollographql/apollo-client/issues/4636#issuecomment-480307041
*/
export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`

interface ProfessionProps {
  buttonText: string
  onSubmit: (occupation: Occupation) => void
}

const Profession: React.FC<RouteComponentProps & ProfessionProps> = ({
  buttonText,
  onSubmit,
}) => {
  const [query, setQuery] = useState('')
  const createOccupation = useMutation(CREATE_OCCUPATION_CLIENT)

  const removeOccupationClient = useMutation(REMOVE_OCCUPATION_CLIENT)

  const { data, error: ontologyError } = useQuery(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: useDebounce(query, 200),
      type: OntologyType.Occupation,
    },
    skip: !query,
  })

  const { data: occupationResult, error: occupationError } = useQuery<
    GetOccupationClientQuery,
    GetOccupationClientQueryVariables
  >(GET_OCCUPATION_CLIENT)

  if (ontologyError || occupationError) {
    return <div>Error...</div>
  }

  const handleSubmit = () =>
    occupationResult.occupation ? onSubmit(occupationResult.occupation) : null

  return (
    <>
      <Grid alignContent="start">
        <IllustrationHeader
          imageAltTag="Resväska"
          imageFirst={true}
          imageSource={suitcaseIllustration}
          title="Vad vill du jobba med?"
        />
        <Global
          styles={css`
            strong {
              font-weight: 700;
              text-transform: capitalize;
            }
          `}
        />
        {occupationResult.occupation && occupationResult.occupation.term ? (
          <FakeInput>
            {occupationResult.occupation.term}{' '}
            <RemoveButton
              data-testid="removeButton"
              onClick={() => removeOccupationClient()}
            >
              <img alt="close" src={close} />
            </RemoveButton>
          </FakeInput>
        ) : (
          <Downshift
            itemToString={item => (item ? item.term : '')}
            onChange={occupation => {
              createOccupation({
                variables: {
                  occupation: {
                    term: occupation.term,
                    experience: null,
                  },
                },
              })
              setQuery('')
            }}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
            }) => (
              <div>
                <SearchInput
                  {...getInputProps({
                    name: 'search',
                    placeholder: 'Yrkesroll eller yrkesområde',
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(event.target.value),
                    value: query,
                  })}
                />

                {data && data.ontologyConcepts && (
                  <SearchList isOpen={isOpen} {...getMenuProps()}>
                    {isOpen
                      ? data.ontologyConcepts
                          .filter(
                            (item: OntologyConceptResponse) =>
                              !inputValue ||
                              item.term
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                          )
                          .map(
                            (item: OntologyConceptResponse, index: number) => (
                              <ListItem
                                bg={
                                  highlightedIndex === index
                                    ? 'seashellPeach'
                                    : 'white'
                                }
                                key={item.id}
                                px="medium"
                                {...getItemProps({
                                  key: item.id,
                                  index,
                                  item,
                                  dangerouslySetInnerHTML: highlightMarked(
                                    inputValue,
                                    item.term
                                  ),
                                })}
                              />
                            )
                          )
                      : null}
                  </SearchList>
                )}
              </div>
            )}
          </Downshift>
        )}
      </Grid>
      <FooterButton
        disabled={occupationResult.occupation ? false : true}
        onClick={handleSubmit}
        text={buttonText}
      />
    </>
  )
}

export default Profession
