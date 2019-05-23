import React, { useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { OntologyType, OntologyConceptResponse } from 'generated/myskills.d'
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
import RegistrationLayout from 'components/Layout/RegistrationLayout'
import { GET_OCCUPATION_CLIENT } from 'graphql/resolvers/mutations/createOccupation'
import close from 'assets/icons/close_black.svg'
import styled from '@emotion/styled'

const SearchInput = styled(Input)`
  width: 100%;
  &:focus {
    outline: none;
  }
`
const RemoveButton = styled.button`
  background: transparent;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-top: 5px;
  &:focus {
    outline: none;
  }
  &:active {
    background: none;
  }
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
    removeOccupationClient(occupation: $occupation) @client
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
const InputContainer = styled.div`
  display: flex;
  border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  border-radius: 5px;
`

const ChooseProfession: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const createOccupation = useMutation(CREATE_OCCUPATION_CLIENT)
  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      createOccupation({
        variables: {
          occupation: {
            term: query,
            experience: null,
          },
        },
      })
    }
  }
  const removeOccupationClient = useMutation(REMOVE_OCCUPATION_CLIENT)

  const { data, error: ontologyError } = useQuery(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: useDebounce(query, 200),
      type: OntologyType.Occupation,
    },
    skip: !query,
  })

  const { data: occupationResult, error: occupationError } = useQuery(
    GET_OCCUPATION_CLIENT
  )

  if (ontologyError || occupationError) {
    return <div>Error...</div>
  }

  return (
    <RegistrationLayout
      disableNextBtn={occupationResult.occupation ? false : true}
      headerText="YRKE"
      nextPath="kompetenser"
      step={1}
    >
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
              <InputContainer role="textbox">
                <SearchInput
                  border="none"
                  {...getInputProps({
                    name: 'search',
                    placeholder: 'Yrkesroll eller yrkesområde',
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(event.target.value),
                    value:
                      (occupationResult.occupation &&
                        occupationResult.occupation.term) ||
                      query,
                    onKeyPress,
                  })}
                />

                <RemoveButton
                  data-testid="removeButton"
                  onClick={() => {
                    setQuery('')
                    removeOccupationClient()
                  }}
                >
                  {query || occupationResult.occupation ? (
                    <img alt="close" src={close} />
                  ) : null}
                </RemoveButton>
              </InputContainer>
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
                        .map((item: OntologyConceptResponse, index: number) => (
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
                        ))
                    : null}
                </SearchList>
              )}
            </div>
          )}
        </Downshift>
      </Grid>
    </RegistrationLayout>
  )
}

export default ChooseProfession
