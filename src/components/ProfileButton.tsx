import React from 'react'
import Button from './Button'
import { InternalLink } from './Link'
import Flex from './Flex'
import styled from '@emotion/styled'
import ProfileIcon from '../assets/icons/profile_user'
import TimelineIcon from '../assets/icons/timeline'

interface ProfileButtonProps {
  buttonText: string
  route: string
  isActive: boolean
}

const Icon = styled.img`
  margin-right: 5px;
`

const ProfileButton: React.FC<ProfileButtonProps> = ({
  buttonText,
  route,
  isActive,
}) => {
  return (
    <InternalLink to={route} width="100%">
      <Button
        borderRadius="5px 5px 0 0"
        p="14px 14px 16px 14px"
        variant={isActive ? 'primary' : 'inactive'}
        width="100%"
      >
        <Flex alignItems="center" justifyContent="center">
          {route === '/profil/' ? (
            <ProfileIcon active={isActive} />
          ) : (
            <TimelineIcon active={isActive} />
          )}
          {buttonText}
        </Flex>
      </Button>
    </InternalLink>
  )
}

export default ProfileButton
