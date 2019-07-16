import React from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'

import { Logo } from '~styleguide'

const Styled = styled.div`
  text-align: center;

  small {
    display: block;
    font-style: italic;

    img {
      height: 3em;
      margin-top: -0.4em;
      vertical-align: middle;
    }
  }
`

const BlockSiteBranding = ({ block }) => (
  <Styled>
    Welcome to the <b>Next on Drupal</b> boilerplate!
    <small>
      brought to you by{ ' ' }
      <a href='https://taller.net.br'>
        <Logo />
      </a>
    </small>
  </Styled>
)

BlockSiteBranding.propTypes = {
  block: object.isRequired
}

BlockSiteBranding.is = ({ entityId }) => !!entityId.match(/branding$/)

export default BlockSiteBranding
