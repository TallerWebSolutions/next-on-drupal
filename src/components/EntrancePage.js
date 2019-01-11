import React from 'react'
import { node, string } from 'prop-types'
import styled from 'styled-components'

import Page from './Page'

const StyledViewport = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
`

const StyledMain = styled.div`
  display: flex;
  padding: 8rem 1.5rem;
  flex-basis: 100%;
  overflow: auto;
  text-align: center;
`

const StyledMainContent = styled.div`
  max-width: 32rem;
  margin: auto;
`

const EntrancePage = ({ title, children }) => (
  <Page title={ title }>
    <StyledViewport>
      <StyledMain>
        <StyledMainContent>{ children }</StyledMainContent>
      </StyledMain>
    </StyledViewport>
  </Page>
)

EntrancePage.propTypes = {
  children: node.isRequired,
  title: string
}

EntrancePage.defaultProps = {
  title: null
}

export default EntrancePage
