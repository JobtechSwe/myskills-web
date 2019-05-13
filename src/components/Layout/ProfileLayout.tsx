import React from 'react'
import Grid from '../Grid'
import ProfileButton from '../ProfileButton'
import Flex from '../Flex'
import styled from '@emotion/styled'
import { Paragraph } from '../Typography'

interface ProfileLayoutProps {
  currentPath: string
}

const NavigationContainer = styled(Flex)`
  left: 0;
  bottom: 0;
  width: 100%;
  svg {
    margin-right: 5px;
  }
`

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  currentPath,
}) => {
  return (
    <Grid gridGap="0" gridTemplateRows="auto 1fr auto" p="large">
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <Flex />
        <Paragraph fontSize="medium" mb="10px" mt="0">
          SYSTEMUTVECKLARE
        </Paragraph>
        <Paragraph fontSize="large" fontWeight="bold" mb="0" mt="0">
          Lasse Kongo
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
          isActive={currentPath === '/profil/'}
          route="/profil/"
        />
        <ProfileButton
          buttonText="Tidslinje"
          isActive={currentPath === '/profil/tidslinje/'}
          route="/profil/tidslinje/"
        />
      </NavigationContainer>
    </Grid>
  )
}

export default ProfileLayout
