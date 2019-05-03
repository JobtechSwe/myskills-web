import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Grid from '../../components/Grid'
import Flex from '../../components/Flex'
import Input from '../../components/Input'
import { H1, Label } from '../../components/Typography'

export const WorkExperiences: React.FC<RouteComponentProps> = () => {
  const [isFocused, setFocused] = React.useState(false)

  return (
    <Flex flexDirection="column">
      <H1 textAlign="center">Vad har du för arbetslivserfarenhet?</H1>
      <Grid gridGap={6}>
        <Label>Lägg till erfarenhet</Label>
        <Input name="experienceName" placeholder="Namn på tjänst" />
        <Input name="employeerName" placeholder="Arbetsgivare" />
      </Grid>
      <Grid gridAutoFlow="column" gridGap={6} mt="small">
        <Flex flexDirection="column">
          <Label>Från</Label>
          <Input
            name="experienceName"
            onBlur={() => setFocused(false)}
            onFocus={() => setFocused(true)}
            placeholder={!isFocused ? 'Startdatum' : null}
            type={isFocused ? 'month' : 'text'}
          />
        </Flex>
        <Flex flexDirection="column">
          <Label>Till</Label>
          <Input name="experienceName" placeholder="Slutdatum" />
        </Flex>
      </Grid>
    </Flex>
  )
}

export default WorkExperiences
