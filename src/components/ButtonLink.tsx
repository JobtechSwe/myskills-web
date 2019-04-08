import styled from '@emotion/styled'
import {
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
} from 'styled-system'

const ButtonLink = styled.a`
  text-decoration: none;
  color: #000;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: #444;
  }

  ${fontFamily}
  ${fontSize}
  ${space}
`

type ButtonLinkProps = FontFamilyProps & FontSizeProps & SpaceProps

const common: ButtonLinkProps = {
  fontFamily: 'default',
  fontSize: ['small', 'medium'],
}

ButtonLink.defaultProps = {
  ...common,
}

export default ButtonLink
