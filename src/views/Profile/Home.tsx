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
    image

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

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Home: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  const { data, error, loading } = useQuery(GET_CV, {
    fetchPolicy: 'network-only',
  })

  return (
    <ProfileLayout currentPath={location.pathname}>
      {error && 'error'}
      {loading && <Loader />}
      {!loading && data && (
        <>
          <Container mb="10px">
            <ProfileDataCard
              flexVal={0.65}
              isTop
              noBackground
              route="beskriv-dig"
            >
              <Paragraph fontSize="small" mb="none" mt="none">
                {data.personalDescription}
              </Paragraph>
            </ProfileDataCard>
            <ProfileDataCard flexVal={0.35} isImage isTop route="editplace">
              <Image src={`data:image/jpeg;base64,${data.image}`} />
            </ProfileDataCard>
          </Container>
          <Container mb="10px">
            <ProfileDataCard route="egenskaper">
              <H2 mb="small">Egenskaper</H2>
              {data.traits &&
                data.traits.map((trait: string) => (
                  <Paragraph fontSize="small" key={trait} mb="none" mt="none">
                    {trait},
                  </Paragraph>
                ))}
            </ProfileDataCard>
            <ProfileDataCard route="editplace">
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
              <H2 mb="none" width="100%">
                Kontakt
              </H2>
              {data.profile && (
                <Flex
                  alignItems="flex-end"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <Paragraph fontSize="small" mb="none" mr="5px" mt="8px">
                    {data.profile.email}
                  </Paragraph>
                  <Paragraph fontSize={25} mb="none" mr="5px" mt="8px">
                    ·
                  </Paragraph>
                  <Paragraph fontSize="small" mb="none" mr="5px" mt="8px">
                    {data.profile.telephone}
                  </Paragraph>

                  <InternalLink mb="4px" to="editplace">
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
