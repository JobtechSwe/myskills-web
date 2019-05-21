import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { InternalLink } from './Link'
import editIcon from '../assets/icons/edit.svg'
import editImageIcon from '../assets/icons/edit_image.svg'

interface IProfileDataCardProps {
  children: ReactNode
  flexVal?: number
  hasEdit?: boolean
  isImage?: boolean
  isTop?: boolean
  noBackground?: boolean
  route: string
}

const EditButton = styled(InternalLink)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`

const Edit = ({ route, isImage }: { route: string; isImage: boolean }) => (
  <EditButton to={route}>
    <img alt="Edit data" src={isImage ? editImageIcon : editIcon} />
  </EditButton>
)

const Box = styled.div<any>`
  border-radius: 10px;
  background: ${({ theme, noBackground }) =>
    !noBackground ? theme.colors.alabaster : 'none'};
  padding: ${({ theme }) => theme.space.small}px;
  padding-bottom: 20px;
  position: relative;
  min-height: ${({ isTop }) => (isTop ? '100px' : '150px')};
  flex: ${({ flexVal }) => (flexVal ? flexVal : 0.5)};
`

const ProfileDataCard: React.FC<IProfileDataCardProps> = ({
  children,
  flexVal = 0.5,
  hasEdit = true,
  isImage = false,
  isTop = false,
  noBackground = false,
  route = '',
}) => (
  <Box flexVal={flexVal} isTop={isTop} noBackground={noBackground}>
    {hasEdit && <Edit isImage={isImage} route={route} />}
    {children}
  </Box>
)
export default ProfileDataCard
