import { configure } from '@storybook/react'

// automatically import all files ending in *.stories.js
const req = require.context('../../src', true, /.stories.js$/)
const reqSamples = require.context('./samples', true, /.stories.js$/)

const loadStories = () => {
  req.keys().forEach(filename => req(filename))
  reqSamples.keys().forEach(filename => reqSamples(filename))
}

configure(loadStories, module)
