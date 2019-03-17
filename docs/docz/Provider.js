import { node } from 'prop-types'
import { ThemeConfig } from 'docz'
import { ThemeProvider } from 'styled-components'

const Provider = ({ children }) => (
  <ThemeConfig>
    { ({ themeConfig }) => (
      <ThemeProvider theme={ themeConfig }>{ children }</ThemeProvider>
    ) }
  </ThemeConfig>
)

Provider.propTypes = {
  children: node.isRequired
}

export default Provider
