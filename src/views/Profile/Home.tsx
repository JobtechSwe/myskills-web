import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import styled from '@emotion/styled'
import Flex from '../../components/Flex'

const GET_PROFILE = gql`
  query getProfile {
    occupation {
      term
      experience {
        years
      }
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
  }
`
const BoxOne = styled.div`
  background: lightgrey;
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
  div:nth-of-type(odd) {
    margin-right: 10px;
  }
`

const Home: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  const { data } = useQuery(GET_PROFILE, {
    fetchPolicy: 'network-only',
  })

  console.log(data)
  return (
    <ProfileLayout currentPath={location.pathname}>
      <Container mb="10px">
        <BoxOne>hej</BoxOne>
        <Image>Bild</Image>
      </Container>
      <Container mb="10px">
        <Box>hej</Box>
        <Box>hej</Box>
      </Container>
      <Container mb="10px">
        <Box>hej</Box>
        <Box>hej</Box>
      </Container>
    </ProfileLayout>
  )
}

export default Home
