# Next on Drupal

<a href="https://taller.net.br/" target="_blank">
  <img src="https://static.taller.work/static/logo.svg" height="38" />
</a>

This project is a boilerplate aimed to facilitate scafolding of [Next.js](https://nextjs.org/) projects based on [Drupal](https://www.drupal.org/) backends exposed via [GraphQL](https://www.drupal.org/project/graphql).

On [the documentation](https://next-on-drupal.surge.sh) you find explanation on many of the concepts, solutions, and whys for most of the decisions you'll find along the way in the code.

> This boilerplate is well fit to be used in company with the [Drupal Enterprise Boilerplate](https://github.com/TallerWebSolutions/drupal-enterprise-boilerplate) project.

## Tasks

- **Development UX**

  - [x] Docker
  - [x] Code style
    - [x] Eslint
    - [x] `package.json` formatting
  - [x] Git hooks automation
  - [x] Aliases
  - [x] VSCode config
  - [x] Reusable Babel
  - [x] Reusable Webpack
  - [x] Integrated debugging
  - [x] Single source-code dir
  - [x] Client/server specific dev scripts
  - [x] Storybook

- **Documentation**

  - [x] Scafold Docz
  - [x] Code annotation
  - [x] Deploy docs
  - Document...
    - [x] Routing
    - [x] Layout & Blocks
    - [x] Composition pattern
    - [x] Project structure
    - [ ] Troubleshooting
      - [ ] `Unexpected < in JSON` (access? memory?)

- **Code/project quality**

  - [x] Bundle analyzer
  - Unit tests
    - [x] Configure Jest
    - [ ] Add coverage threshold
    - [ ] Test boilerplate code
  - [ ] E2E tests
    - [ ] Setup cypress

- **Functionallity**
  - [x] Styleguide (init)
  - [x] GraphQL Client
    - [x] Fragment matcher
    - [x] GraphQL build-time parsing
  - [x] Drupal router integration
    - [x] Server-side routing (nxcf)
    - [x] Client-side routing (new!)
    - [x] Dynamic imports
  - [x] Drupal layout integration
