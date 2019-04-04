import styled from '@emotion/styled'
import { fontSize, FontSizeProps } from 'styled-system'

const ButtonLink = styled.a`
  text-decoration: none;
  color: #000;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: #444;
  }

  ${fontSize}
`

type ButtonLinkProps = FontSizeProps

const common: ButtonLinkProps = {
  fontSize: ['small', 'medium'],
}

ButtonLink.defaultProps = {
  ...common,
}

export default ButtonLink
