import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {
  OntologyType,
  OntologyConceptResponse,
} from '../../generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import Flex from '../../components/Flex'
import Input from '../../components/Input'
import ListItem from '../../components/ListItem'
import List from '../../components/List'
import { H1, H3 } from '../../components/Typography'
import { FloatingContinueButton } from '../../components/Button'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { InternalLink } from '../../components/Link'
import ChosenOccupations from '../../components/ChosenOccupations'
import Downshift from 'downshift'

const SearchInput = styled(Input)`
  width: 100%;
`

const SearchList = styled(List)<{ isOpen: boolean }>`
  border-top: none;
  max-height: 224px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: ${({ theme }) => `0px 8px 16px 0px ${theme.colors.whiteLilac}`};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
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

export const ADD_OCCUPATION_CLIENT = gql`
  mutation addOccupationClient($occupation: ClientOccupationInput!) {
    addOccupationClient(occupation: $occupation) @client {
      term
      type
      id
    }
  }
`

export const ADD_OCCUPATION_API = gql`
  mutation addExperienceApi($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      term
      years
      taxonomyId
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
const highlightMarked = (inputValue: string, term: string) => {
  const reg = new RegExp(inputValue, 'i')

  return {
    __html: term.replace(reg, `<strong>${inputValue}</strong>`),
  }
}

const ChooseProfession: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  // TODO: Use debounce, skipping for now because of complications in tests
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only',
  })

  const addOccupation = useMutation(
    isLoggedIn.isLoggedIn ? ADD_OCCUPATION_API : ADD_OCCUPATION_CLIENT
  )

  const { data, error } = useQuery(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: query,
      type: OntologyType.Occupation,
    },
    skip: !query,
  })

  if (error) {
    return <div>Error...</div>
  }

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <Global
        styles={css`
          strong {
            font-weight: 700;
            text-transform: capitalize;
          }
        `}
      />
      <H3 mb={20}>YRKE</H3>
      <H1 mb={20}>Vad vill du jobba med?</H1>
      <Downshift
        itemToString={item => (item ? item.iterm : '')}
        onChange={occupation => {
          addOccupation({
            variables: {
              occupation,
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
                      .map((item: OntologyConceptResponse, index: number) => (
                        <ListItem
                          key={item.id}
                          bg={
                            highlightedIndex === index
                              ? 'seashellPeach'
                              : 'white'
                          }
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
      <ChosenOccupations />
      <InternalLink to="/skapa-cv/kompetenser">
        <FloatingContinueButton>Nästa</FloatingContinueButton>
      </InternalLink>
    </Flex>
  )
}

export default ChooseProfession
