import { css } from '@emotion/core'

export const globalStyle = css`
  /* http://meyerweb.com/eric/tools/css/reset/
   v4.0 | 20180602
   License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a,
  button {
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
    /* Explanation: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
    height: calc(var(--vh, 1vh) * 100);
  }

  /* browser style resets */
  button,
  input {
    background: transparent;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`

export const routeTransitionStyles = css`
  [class^='fadeTranslate-'] {
    display: none;
  }
  [class^='fadeTranslate-']:first-of-type {
    display: block;
  }

  .fadeTranslate-enter {
    opacity: 0;
  }

  .fadeTranslate-enter.fadeTranslate-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fadeTranslate-exit {
    opacity: 1;
    transform: translate(0, 0);
  }

  .fadeTranslate-exit.fadeTranslate-exit-active {
    opacity: 0;
    transform: translate(0, 3vh);
    transition: opacity 300ms ease-in, transform 300ms ease-in-out;
  }

  .fix-container {
    position: fixed;
  }
`

export default globalStyle
