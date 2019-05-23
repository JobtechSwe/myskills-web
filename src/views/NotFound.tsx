import { RouteComponentProps } from '@reach/router'
import React from 'react'
import styled from '@emotion/styled'
import Flex from '../components/Flex'
import { InternalLink } from '../components/Link'
import Button from '../components/Button'
import { Paragraph } from '../components/Typography'

const Block = styled.span`
  align-items: center;
  background: ${({ theme }) => `radial-gradient(
    647.69px at 6.66% 96.53%,
    ${theme.colors.yourPink} 0%,
    ${theme.colors.seashellPeach} 100%
  )`};
  display: grid;
  justify-content: center;
  min-height: 677px;
  font-weight: bold;
`

const NotFound: React.FC<RouteComponentProps> = () => {
  return (
    <Block>
      <Paragraph>The page could not be found :( </Paragraph>
      <InternalLink to={'/'}>
        <Button>{'Go to start'}</Button>
      </InternalLink>
    </Block>
  )
}
export default NotFound
