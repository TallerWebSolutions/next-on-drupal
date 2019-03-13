import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class DrupalNextDocument extends Document {
  static async getInitialProps ({ renderPage, ...ctx }) {
    const sheet = new ServerStyleSheet()

    // execute parent Document's getInitialProps with a custom renderPage
    const { styles, ...initialProps } = await Document.getInitialProps({
      renderPage: () =>
        renderPage({
          enhanceApp: App => props => sheet.collectStyles(<App { ...props } />)
        }),
      ...ctx
    })

    return {
      ...initialProps,
      styles: [...styles, ...sheet.getStyleElement()]
    }
  }
}
