import React from 'react'
import Grid from './Grid'
import { H1 } from './Typography'

interface IllustrationHeaderProps {
  imageFirst: boolean
  imageAltTag: string
  imageSource: string
  title: string
}
const IllustrationHeader: React.FC<IllustrationHeaderProps> = ({
  imageFirst,
  imageAltTag,
  title,
  imageSource,
}) => (
  <Grid gridGap="large" justifyContent="center">
    <img alt={imageAltTag} src={imageSource} />
    <H1 textAlign="center">{title}</H1>
  </Grid>
)

export default IllustrationHeader
