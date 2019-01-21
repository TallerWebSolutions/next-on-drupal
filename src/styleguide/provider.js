import { Fragment } from 'react'
import { createGlobalStyle } from 'styled-components'

// import global antd styles
import 'antd/dist/antd.min.css'

import { colors } from '@styleguide'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Alegreya:400,700');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700');

  div#__next, html, body  {
    margin: 0;
    color: ${colors.text};
    background-color: ${colors.background};
    font-size: 16px;
    font-family: 'Alegreya', 'aleo', Georgia, 'Times New Roman', Times,
      Georgia, 'DejaVu Serif', serif;
  }
`

export default Component => props => (
  <Fragment>
    <GlobalStyle />
    <Component { ...props } />
  </Fragment>
)
