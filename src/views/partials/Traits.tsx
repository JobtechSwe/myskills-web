import { RouteComponentProps } from '@reach/router'
import Grid from 'components/Grid'
import Flex from 'components/Flex'
import { v4 } from 'uuid'
import { useQuery, MutationHookOptions } from 'react-apollo-hooks'
import React, { useEffect, useState, useRef } from 'react'
import { useDebounce, useToggle } from '@iteam/hooks'
import Downshift from 'downshift'
import { Global, css } from '@emotion/core'
import Input from 'components/Input'
import { SearchList } from 'components/List'
import Tag from 'components/Tag'
import ListItem from 'components/ListItem'
import { InputWrapper, TagButton } from 'components/ButtonToInput'
import { H1, Paragraph } from 'components/Typography'
import {
  OntologyTextParseResponse,
  Query,
  OntologyType,
  OntologyConceptResponse,
  AddTraitMutationVariables,
  RemoveTraitMutationVariables,
} from 'generated/myskills.d'
import gql from 'graphql-tag'
import { GET_ONTOLOGY_CONCEPTS } from 'views/partials/Profession'
import { highlightMarked, handleFocusKeyDown } from 'utils/helpers'
import TagList from 'components/TagList'
import { FooterButton } from 'components/Layout/Registration'

export const ADD_TRAIT = gql`
  mutation addTrait($trait: String!) {
    addTrait(trait: $trait) @client
  }
`

export const REMOVE_TRAIT = gql`
  mutation removeTrait($trait: String!) {
    removeTrait(trait: $trait) @client
  }
`

interface TraitsProps {
  buttonText: string
  onSubmit: (traits: string[]) => void
  addTraitMutation: (
    trait: MutationHookOptions<{}, AddTraitMutationVariables>
  ) => void
  removeTraitMutation: (
    trait: MutationHookOptions<{}, RemoveTraitMutationVariables>
  ) => void
  traits: string[]
}

const Traits: React.FC<RouteComponentProps & TraitsProps> = ({
  buttonText,
  location,
  onSubmit,
  addTraitMutation,
  removeTraitMutation,
  traits,
}) => {
  const navigationTraits: OntologyTextParseResponse[] =
    (location && location.state && location.state.traits) || []

  const [traitQuery, setTraitQuery] = useState('')
  const [addTraitActive, setAddTraitActive] = useToggle(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: ontologyRelated } = useQuery<{
    ontologyConcepts: Query['ontologyConcept'][]
  }>(GET_ONTOLOGY_CONCEPTS, {
    variables: {
      filter: useDebounce(traitQuery, 500),
      type: OntologyType.Trait,
    },
    skip: !traitQuery,
  })
  const [suggestedTraits, setSuggestedTraits] = useState(
    navigationTraits.map(t => t.term)
  )

  const handleChange = (value: string) => {
    addTrait(value)
    setTraitQuery('')
  }

  const removeTrait = (trait: string) => {
    removeTraitMutation({
      variables: {
        trait,
      },
    })

    // setSuggestedTraits([...suggestedTraits, trait])
  }

  const addTrait = (trait: string) => {
    addTraitMutation({
      variables: {
        trait,
      },
    })

    setSuggestedTraits(suggestedTraits.filter(t => t !== trait))
  }

  const onTagClick = (tag: { id: string; term: string }) => {
    // if (traits.some(t => t === tag.term)) {
    //   return removeTrait(tag.term)
    // }

    return removeTrait(tag.term)
  }

  useEffect(() => {
    // setSuggestedTraits(s => s.filter(t => traits.indexOf(t) === -1))
    // if (inputRef && inputRef.current) {
    //   inputRef.current.focus()
    // }
  }, [traits, addTraitActive, suggestedTraits])

  return (
    <>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Grid
          alignItems="center"
          gridGap="medium"
          justifyContent="center"
          mb="medium"
        >
          <H1 mb={0} textAlign="center">
            Vilka är dina främsta egenskaper?
          </H1>
          <Paragraph my={0} textAlign="center">
            Markera de egenskaper som bäst motsvarar dina. Du kan också lägga
            till egna, exempelvis ansvarstagande, flexibel eller strukturerad.
          </Paragraph>
        </Grid>
        <TagList
          activeItems={traits.map(trait => ({ id: v4(), term: trait }))}
          items={suggestedTraits.map(trait => ({ id: v4(), term: trait }))}
          onSelect={onTagClick}
        />
        <Global
          styles={css`
            strong {
              font-weight: 700;
              text-transform: capitalize;
            }
          `}
        />
        {addTraitActive ? (
          <Downshift
            itemToString={item => (item ? item.term : '')}
            onChange={(item: OntologyConceptResponse) =>
              setTraitQuery(item.term)
            }
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
                <InputWrapper as="div" mt="small" p={0}>
                  <Input
                    alignSelf="stretch"
                    border="none"
                    ref={inputRef}
                    {...getInputProps({
                      name: 'trait',
                      placeholder: 'Lägg till en egenskap',
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                        setTraitQuery(event.target.value),
                      value: traitQuery,
                    })}
                  />

                  <TagButton
                    borderRadius={8}
                    data-testid="okButton"
                    ml={6}
                    onClick={() => {
                      handleChange(traitQuery)
                      setAddTraitActive()
                    }}
                    onKeyDown={handleFocusKeyDown(() => {
                      handleChange(traitQuery)
                      setAddTraitActive()
                    })}
                    p="small"
                    role="button"
                    tabIndex={0}
                  >
                    OK
                  </TagButton>
                </InputWrapper>

                {ontologyRelated && ontologyRelated.ontologyConcepts && (
                  <SearchList isOpen={isOpen} {...getMenuProps()}>
                    {isOpen
                      ? ontologyRelated.ontologyConcepts
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
        ) : (
          <Tag
            data-testid="addTraitButton"
            mb="medium"
            mt="small"
            onClick={setAddTraitActive}
            onKeyDown={handleFocusKeyDown(setAddTraitActive)}
            role="button"
            tabIndex={0}
          >
            + Lägg till en ny egenskap
          </Tag>
        )}
      </Flex>
      <FooterButton onClick={() => onSubmit(traits)} text={buttonText} />
    </>
  )
}

export default Traits
