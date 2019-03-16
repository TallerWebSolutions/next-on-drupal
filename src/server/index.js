/* eslint-disable no-console */
import express from 'express'
import next from 'next'

import { resolve } from '@shared/router'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const initializeServer = () => {
  const server = express()

  // Drupal based route resolver.
  server.get('*', (req, res, next) =>
    resolve(req).then(route =>
      route ? app.render(req, res, '/drupal', { route }) : next()
    )
  )

  // NextJS fallback route resolver.
  server.get('*', (req, res) => handle(req, res))

  server.listen(3000, err => {
    if (err) {
      throw err
    }
    // eslint-disable-next-line no-console
    console.log('> Ready on http://localhost:3000')
  })
}

const quitOnError = err => {
  console.error('Application failed to start')
  console.error(err)
  process.exit(1)
}

app
  .prepare()
  .then(initializeServer)
  .catch(quitOnError)
