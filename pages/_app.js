import App, { Container } from 'next/app'

// import global antd styles
import 'antd/dist/antd.min.css'

export default class MyApp extends App {
  // static async getInitialProps ({ Component, router, ctx }) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component { ...pageProps } />
      </Container>
    )
  }
}
