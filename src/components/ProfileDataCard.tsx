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
  isImage: boolean
}

const EditButtonContainer = styled.div<{ isImage: boolean }>`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: ${({ isImage }) => (isImage ? 'calc(100% - 40px)' : '10px')};
  height: 100%;
  width: 25px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  img {
    margin-bottom: 10px;
  }
`
const Edit = ({ route, isImage }: { route: string; isImage: boolean }) => (
  <InternalLink to={route}>
    <EditButtonContainer isImage={isImage}>
      <img alt="Edit data" src={isImage ? editImageIcon : editIcon} />
    </EditButtonContainer>
  </InternalLink>
)

const Box = styled.div<IBoxProps>`
  border-radius: 10px;
  background: ${({ theme, noBackground }) =>
    !noBackground ? theme.colors.alabaster : 'none'};
  padding: ${({ theme, isImage }) => (!isImage ? theme.space.small : 0)}px;
  padding-bottom: ${({ isImage }) => (!isImage ? 20 : 0)}px;
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
  <Box
    flexVal={flexVal}
    isImage={isImage}
    isTop={isTop}
    noBackground={noBackground}
  >
    {hasEdit && <Edit isImage={isImage} route={route} />}
    {children}
  </Box>
)
export default ProfileDataCard
