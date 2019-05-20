import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import styled from '@emotion/styled'
import Flex from '../../components/Flex'
import editIcon from '../../assets/icons/edit.svg'
import { Paragraph, H2 } from '../../components/Typography'
import { Skill, Education, Experience } from '../../generated/myskills'
import { InternalLink } from '../../components/Link'

const GET_PROFILE = gql`
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
const BoxOne = styled.div`
  height: 100px;
  flex: 0.65;
`
const Box = styled.div`
  background: lightgrey;
  height: 150px;
  flex: 0.5;
`

const Image = styled.div`
  background: lightgrey;
  flex: 0.35;
`

const Container = styled(Flex)`
  div {
    position: relative;
    padding: ${({ theme }) => theme.space.small}px;
    background: ${({ theme }) => theme.colors.alabaster};
    border-radius: 10px;
  }
  div:nth-of-type(odd) {
    margin-right: 10px;
  }
`

const EditButton = styled(InternalLink)`
  position: absolute;
  right: 0;
  top: 0;
`
const Edit = ({ route }: { route: string }) => (
  <EditButton to={route}>
    <img alt="Edit data" src={editIcon} />
  </EditButton>
)

const Home: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  const { data } = useQuery(GET_PROFILE, {
    fetchPolicy: 'network-only',
  })

  return (
    <ProfileLayout currentPath={location.pathname}>
      <Container mb="10px">
        <BoxOne>
          <Paragraph fontSize="xsmall" mt="none">
            {data.personalDescription}
          </Paragraph>
          <Edit route="hej" />
        </BoxOne>
        <Image>Bild</Image>
      </Container>
      <Container mb="10px">
        <Box>
          <H2 mb="small">Egenskaper</H2>
          {data.traits &&
            data.traits.map((trait: string) => (
              <Paragraph fontSize="xsmall" key={trait} mb="none" mt="none">
                {trait}
              </Paragraph>
            ))}
          <Edit route="hej" />
        </Box>
        <Box>
          <H2 mb="small">Kompetens</H2>
          {data.skills &&
            data.skills.map((skill: Skill) => (
              <Paragraph fontSize="xsmall" key={skill.id} mb="none" mt="none">
                {skill.term},
              </Paragraph>
            ))}
          <Edit route="hej" />
        </Box>
      </Container>
      <Container mb="10px">
        <Box>
          <H2 mb="small">Utbildning</H2>
          {data.educations &&
            data.educations.map((education: Education) => (
              <Paragraph
                fontSize="xsmall"
                key={education.id}
                mb="none"
                mt="none"
              >
                {education.programme}
              </Paragraph>
            ))}
          <Edit route="hej" />
        </Box>
        <Box>
          {data.occupation &&
            `${data.occupation.experience.years} års erfarenhet som ${
              data.occupation.term
            }`}

          {data.experiences &&
            data.experiences.map((experience: Experience) => (
              <Paragraph
                fontSize="xsmall"
                key={experience.id}
                mb="none"
                mt="none"
              >
                {experience.term}
              </Paragraph>
            ))}
          <Edit route="hej" />
        </Box>
      </Container>
    </ProfileLayout>
  )
}

export default Home
