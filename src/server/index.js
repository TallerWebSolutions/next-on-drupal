/* eslint-disable no-console */
import express from 'express'
import next from 'next'
// eslint-disable-next-line node/no-deprecated-api
import { parse } from 'url'

import { resolve } from '~drupal/modules/pages/lib/resolver'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const initializeServer = () => {
  const server = express()

  // Drupal based route resolver.
  server.get('*', async (req, res, next) => {
    const isNextRoute = app.router.match(req, res, parse(req.url, true))

    if (!isNextRoute) {
      try {
        const route = await resolve(req)

        if (route) return app.render(req, res, '/drupal', { route })
      } catch (error) {
        console.error(
          `Error resolving path ${req.path} using Drupal: `,
          error.message
        )
      }
    }

    next()
  })

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
