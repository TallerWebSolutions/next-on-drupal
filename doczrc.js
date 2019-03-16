const path = require('path')

const modifyBundlerConfig = config => {
  config.resolve.alias['~docz'] = path.resolve(__dirname, './docs/docz')
  return config
}

export default {
  // theme: 'my-coolest-theme',
  // themeConfig: {
  //   colors: {
  //     primary: 'tomato',
  //   },
  // },
  // modifyBundlerConfig: config => {
  //   /* do your magic here */
  // },
  // plugins: [
  //   myCoolPlugin()
  // ]
  modifyBundlerConfig
}
