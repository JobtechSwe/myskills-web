import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { InternalLink } from './Link'
import editIcon from 'assets/icons/edit.svg'
import editImageIcon from 'assets/icons/edit_image.svg'

interface IProfileDataCardProps {
  children: ReactNode
  flexVal?: number
  hasEdit?: boolean
  isImage?: boolean
  isTop?: boolean
  noBackground?: boolean
  route: string
}

interface IBoxProps {
  noBackground: boolean
  isTop: boolean
  flexVal: number
}
const EditButton = styled(InternalLink)<{ isImage: boolean }>`
  position: absolute;
  right: 10px;
  bottom: ${({ isImage }) => (isImage ? 'calc(100% - 40px)' : '10px')};
`

export const Edit = ({
  route,
  isImage,
}: {
  route: string
  isImage?: boolean
}) => (
  <EditButton isImage={isImage} to={route}>
    <img alt="Edit data" src={isImage ? editImageIcon : editIcon} />
  </EditButton>
)

const Box = styled.div<IBoxProps>`
  border-radius: 10px;
  background: ${({ theme, noBackground }) =>
    !noBackground ? theme.colors.alabaster : 'none'};
  padding: ${({ theme }) => theme.space.small}px;
  padding-bottom: 20px;
  position: relative;
  min-height: ${({ isTop }) => (isTop ? '100px' : '150px')};
  flex: ${({ flexVal }) => (flexVal ? flexVal : 1)};
  overflow-x: scroll;
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
