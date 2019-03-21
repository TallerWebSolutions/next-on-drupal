import React from 'react'
import { node } from 'prop-types'
import { useConfig } from 'docz'
import { ThemeProvider } from 'styled-components'

const Provider = ({ children }) => {
  const { themeConfig } = useConfig()

  return <ThemeProvider theme={ themeConfig }>{ children }</ThemeProvider>
}

Provider.propTypes = {
  children: node.isRequired
}

export default Provider
