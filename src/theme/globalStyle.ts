import { css } from '@emotion/core'

export const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a,
  li {
    cursor: pointer;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  #root {
    min-height: 100vh;
  }
`

export default globalStyle
