import { Fragment } from 'react'
import { createGlobalStyle } from 'styled-components'

// import global antd styles
import 'antd/dist/antd.min.css'

import { colors } from '@styleguide'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Alegreya:400,700');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700,800');

  div#__next, html, body  {
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
