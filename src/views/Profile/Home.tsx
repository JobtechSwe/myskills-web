import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import styled from '@emotion/styled'
import Flex from '../../components/Flex'
import ProfileDataCard from '../../components/ProfileDataCard'
import { Paragraph, H2 } from '../../components/Typography'
import { Skill, Education, Experience } from '../../generated/myskills'
import Loader from '../../components/Loader'

export const GET_PROFILE = gql`
  query getProfile {
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

    traits
    personalDescription
  }
`

const Container = styled(Flex)`
  div:nth-of-type(odd) {
    margin-right: 10px;
  }
`

const Home: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  const { data, error, loading } = useQuery(GET_PROFILE, {
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
              route="editplace"
            >
              <Paragraph fontSize="small" mb="none" mt="none">
                {data.personalDescription}
              </Paragraph>
            </ProfileDataCard>
            <ProfileDataCard flexVal={0.35} isImage isTop route="editplace">
              <div />
            </ProfileDataCard>
          </Container>
          <Container mb="10px">
            <ProfileDataCard route="editplace">
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
            <ProfileDataCard route="editplace">
              <H2 mb="small">Utbildning</H2>
              {data.educations &&
                data.educations.map((education: Education) => (
                  <Paragraph
                    fontSize="small"
                    key={education.id}
                    mb="none"
                    mt="none"
                  >
                    {education.programme}
                  </Paragraph>
                ))}
            </ProfileDataCard>
            <ProfileDataCard route="editplace">
              <H2 mb="small">Erfarenhet</H2>
              {data.occupation && (
                <Paragraph mb="small" mt="none">
                  {`${data.occupation.experience.years} års erfarenhet som 
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
        </>
      )}
    </ProfileLayout>
  )
}

export default Home
