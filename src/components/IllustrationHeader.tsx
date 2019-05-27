import React from 'react'
import Flex from './Flex'
import Grid from './Grid'
import { H1, Paragraph } from './Typography'

interface IllustrationHeaderProps {
  description?: string
  imageAltTag: string
  imageFirst: boolean
  imageSource: string
  title: string
}
const IllustrationHeader: React.FC<IllustrationHeaderProps> = ({
  description,
  imageAltTag,
  imageFirst = true,
  imageSource,
  title,
}) =>
  imageFirst ? (
    <Grid alignItems="center" gridGap="medium" justifyContent="center">
      <Flex justifyContent="center">
        <img alt={imageAltTag} src={imageSource} />
      </Flex>
      <H1 mb={0} mt="small" textAlign="center">
        {title}
      </H1>
      {description && (
        <Paragraph my={0} textAlign="center">
          {description}
        </Paragraph>
      )}
    </Grid>
  ) : (
    <Grid alignItems="center" gridGap="large" justifyContent="center">
      <H1 mb={0} textAlign="center">
        {title}
      </H1>
      {description && (
        <Paragraph my={0} textAlign="center">
          {description}
        </Paragraph>
      )}
      <Flex justifyContent="center">
        <img alt={imageAltTag} src={imageSource} />
      </Flex>
    </Grid>
  )

export default IllustrationHeader
