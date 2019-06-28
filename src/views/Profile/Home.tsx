import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from 'components/Layout/ProfileLayout'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import styled from '@emotion/styled'
import Flex from 'components/Flex'
import ProfileDataCard from 'components/ProfileDataCard'
import { Paragraph, H2 } from 'components/Typography'
import { Skill, Education, Experience } from 'generated/myskills'
import Loader from 'components/Loader'
import editIcon from 'assets/icons/edit.svg'
import { InternalLink } from 'components/Link'

export const GET_CV = gql`
  query getCV {
    occupation {
      term
      experience {
        years
      }
    }

    experiences {
      id
      employer
      sourceId
      term
      start
      end
    }
    # image

    educations {
      programme
      school
      start
      end
      id
    }

    skills {
      sourceId
      term
      type
      id
    }

    profile {
      name
      email
      telephone
    }

    traits
    personalDescription
  }
`

const Container = styled(Flex)`
  div:nth-of-type(odd) {
    margin-right: 10px;
  }
`

// const Image = styled.img`
//   width: 100%;
//   height: 100%;
// `
const Italic = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-size: 14px;
`
const Home: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  const { data, error, loading } = useQuery(GET_CV)

  return (
    <ProfileLayout currentPath={location.pathname}>
      {error && null}
      {loading && <Loader />}
      {!loading && data && (
        <>
          <Container mb="10px" mr="-10px">
            <ProfileDataCard flexVal={1} isTop route="beskriv-dig">
              <H2 mb="small">Beskrivning</H2>
              <Paragraph fontSize="small" mb="none" mt="none">
                {data.personalDescription || (
                  <Italic>Editera för att lägga till en beskrivning</Italic>
                )}
              </Paragraph>
            </ProfileDataCard>
            {/* <ProfileDataCard flexVal={0.35} isImage isTop route="editplace">
              <Image src={`data:image/jpeg;base64,${data.image}`} />
            </ProfileDataCard> */}
          </Container>
          <Container mb="10px">
            <ProfileDataCard route="egenskaper">
              <H2 mb="small">Egenskaper</H2>
              {data.traits && data.traits.length ? (
                data.traits.map((trait: string) => (
                  <Paragraph fontSize="small" key={trait} mb="none" mt="none">
                    {trait},
                  </Paragraph>
                ))
              ) : (
                <Italic>Editera för att lägga till egenskaper</Italic>
              )}
            </ProfileDataCard>
            <ProfileDataCard route="kompetens">
              <H2 mb="small">Kompetens</H2>
              {data.skills &&
                data.skills.map((skill: Skill) => (
                  <Paragraph
                    fontSize="small"
                    key={skill.id}
                    mb="none"
                    mt="none"
                  >
                    {skill.term},
                  </Paragraph>
                ))}
            </ProfileDataCard>
          </Container>
          <Container mb="10px">
            <ProfileDataCard route="utbildning">
              <H2 mb="small">Utbildning</H2>
              {data.educations &&
                data.educations.map((education: Education) => (
                  <Paragraph
                    fontSize="small"
                    key={education.id}
                    mb="none"
                    mt="none"
                  >
                    {education.school}
                  </Paragraph>
                ))}
            </ProfileDataCard>
            <ProfileDataCard route="erfarenheter">
              <H2 mb="small">Erfarenhet</H2>
              {data.occupation && (
                <Paragraph mb="small" mt="none">
                  {`${
                    data.occupation.experience
                      ? data.occupation.experience.years
                      : 0
                  } års erfarenhet som
                  ${data.occupation.term}.`}
                </Paragraph>
              )}

              {data.experiences &&
                data.experiences.map((experience: Experience) => (
                  <Paragraph
                    fontSize="small"
                    key={experience.id}
                    mb="none"
                    mt="none"
                  >
                    {experience.term}
                  </Paragraph>
                ))}
            </ProfileDataCard>
          </Container>
          <Flex mt="small" pl="small">
            <Flex flex="1" flexDirection="column" mb="large">
              <H2 mb="small" width="100%">
                Kontakt
              </H2>
              {data.profile ? (
                <Flex
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="space-between"
                  pr="small"
                >
                  <Paragraph fontSize="small" mb="none" mr="5px" mt="0">
                    {data.profile.email || <Italic>Email saknas</Italic>}
                  </Paragraph>
                  <Paragraph fontSize={25} mb="none" mr="5px" mt="0">
                    ·
                  </Paragraph>
                  <Paragraph fontSize="small" mb="none" mr="5px" mt="0">
                    {data.profile.telephone || (
                      <Italic>Telefonnummer saknas</Italic>
                    )}
                  </Paragraph>

                  <InternalLink mb="4px" mr="6px" to="kontakt">
                    <img alt="Edit profile" src={editIcon} />
                  </InternalLink>
                </Flex>
              ) : (
                <Flex justifyContent="space-between" pr="small">
                  <Italic>Lägg till kontaktuppgifter</Italic>
                  <InternalLink mb="4px" mr="4px" to="kontakt">
                    <img alt="Edit profile" src={editIcon} />
                  </InternalLink>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </ProfileLayout>
  )
}

export default Home
