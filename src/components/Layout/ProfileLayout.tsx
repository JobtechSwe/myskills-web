import React from 'react'
import Grid from '../Grid'
import ProfileButton from '../ProfileButton'
import Flex from '../Flex'
import styled from '@emotion/styled'
import { Paragraph } from '../Typography'
import pdfIcon from 'assets/icons/save_pdf.svg'
import editIcon from 'assets/icons/edit.svg'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

interface ProfileLayoutProps {
  currentPath: string
}

export const GET_PROFESSION_AND_CONTACT = gql`
  query getProfessionAndContact {
    profile @client {
      name
    }
    occupation @client {
      term
    }
  }
`

const NavigationContainer = styled(Flex)`
  left: 0;
  bottom: 0;
  width: 100%;
  svg {
    margin-right: 5px;
  }
`
const SavePdf = styled.button`
  position: absolute;
  margin: 0;
  padding: 0;
  top: ${({ theme }) => theme.space.small}px;
  left: 0;
  img {
    margin-top: 2px;
  }
`

const EditProfession = styled.img`
  margin-left: 8px;
  margin-bottom: 2px;
`

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  currentPath,
}) => {
  const { data } = useQuery(GET_PROFESSION_AND_CONTACT)
  const parsedPath = currentPath.replace(/\/$/, '')

  return (
    <Grid gridGap="0" gridTemplateRows="auto 1fr auto" p="large">
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        position="relative"
      >
        <SavePdf>
          <img alt="save_as_pdf" src={pdfIcon} />
        </SavePdf>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Paragraph fontSize="medium" mb="0" ml="auto" mt="medium">
            {data.occupation
              ? data.occupation.term.toUpperCase()
              : 'Inget yrke angivet'}
          </Paragraph>

          <EditProfession alt="edit" src={editIcon} />
        </Flex>
        <Paragraph fontSize="large" fontWeight="bold" mb="large" mt="medium">
          {(data.profile && data.profile.name) || 'Inget namn angivet'}
        </Paragraph>
      </Flex>
      {children}
      <NavigationContainer
        justifyContent="space-between"
        p="0 32px"
        position="fixed"
      >
        <ProfileButton
          buttonText="Min profil"
          isActive={parsedPath === '/profil'}
          route="/profil/"
        />
        <ProfileButton
          buttonText="Tidslinje"
          isActive={parsedPath === '/profil/tidslinje'}
          route="./tidslinje/"
        />
      </NavigationContainer>
    </Grid>
  )
}

export default ProfileLayout
