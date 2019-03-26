import React, { Fragment } from 'react'
import { createGlobalStyle } from 'styled-components'

import * as colors from './colors'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700');

  html, body, div#__next {
    margin: 0;
    color: ${colors.text};
    background-color: ${colors.background};
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    /* font-family: 'Alegreya', 'aleo', Georgia, 'Times New Roman', Times, serif; */
  }
`

export default Component => props => (
  <Fragment>
    <GlobalStyle />
    <Component { ...props } />
  </Fragment>
)
