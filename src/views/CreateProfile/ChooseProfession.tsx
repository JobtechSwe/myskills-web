import React, { useState } from 'react'
import { useDebounce } from '@iteam/hooks'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {
  OntologyType,
  OntologyConceptResponse,
} from '../../generated/myskills.d'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Input from '../../components/Input'
import IllustrationHeader from '../../components/IllustrationHeader'
import suitcaseIllustration from '../../assets/illustrations/suitcase.svg'
import ListItem from '../../components/ListItem'
import { SearchList } from '../../components/List'
import { css, Global } from '@emotion/core'
import ChosenOccupation from '../../components/ChosenOccupation'
import Downshift from 'downshift'
import { highlightMarked } from '../../utils/helpers'
import RegistrationLayout from '../../components/Layout/RegistrationLayout'

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

const ChooseProfession: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const createOccupation = useMutation(CREATE_OCCUPATION_CLIENT)

  const { data, error } = useQuery(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: useDebounce(query, 200),
      type: OntologyType.Occupation,
    },
    skip: !query,
  })

  if (error) {
    return <div>Error...</div>
  }

  return (
    <RegistrationLayout headerText="YRKE" nextPath="kompetenser" step={1}>
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
              <Input
                width="100%"
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
        <ChosenOccupation />
      </Grid>
    </RegistrationLayout>
  )
}

export default ChooseProfession
