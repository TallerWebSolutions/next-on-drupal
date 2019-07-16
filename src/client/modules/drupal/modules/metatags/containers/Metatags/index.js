import React from 'react'
import { Query } from 'react-apollo'
import { array, string } from 'prop-types'
import {
  pipe,
  find,
  propEq,
  map,
  propOr,
  lensProp,
  allPass,
  path,
  over,
  replace,
  when
} from 'ramda'
import Head from 'next/head'
import env from '~source/env'

import query from './query.gql'

export const META_PROPERTY = 'MetaProperty'
const META_VALUE = 'MetaValue'
export const META_LINK = 'MetaLink'

const onlyMetaProperty = propEq('__typename', META_PROPERTY)
const onlyMetaValue = propEq('__typename', META_VALUE)
const onlyMetaLink = allPass([
  propEq('__typename', META_LINK),
  propEq('key', 'canonical')
])

const setAppHost = when(
  onlyMetaLink,
  over(
    lensProp('value'),
    replace(/^https?:\/\/[^#?/]+/, env('APP_HOST', 'http://localhost:3000'))
  )
)

const normalizeMetatags = pipe(
  path(['route', 'entity', 'entityMetatags']),
  map(setAppHost)
)

const FALLBACK_TITLE = 'Next on Drupal'
const getTitle = pipe(
  find(propEq('key', 'title')),
  propOr(FALLBACK_TITLE, 'value')
)

const Metatags = ({ metatags }) => {
  const pageTitle = getTitle(metatags)

  return (
    <Head>
      { metatags.filter(onlyMetaLink).map(({ key, value }) => (
        <link rel={ key } key={ key } href={ value } />
      )) }

      { metatags.filter(onlyMetaProperty).map(({ key, value }) => (
        <meta key={ key } property={ key } content={ value } />
      )) }

      { metatags.filter(onlyMetaValue).map(({ key, value }) => (
        <meta key={ key } name={ key } content={ value } />
      )) }

      { pageTitle && <title key='title'>{ pageTitle }</title> }
    </Head>
  )
}

Metatags.propTypes = {
  metatags: array
}

const MetatagsContainer = ({ path: urlPath }) => (
  <Query query={ query } variables={ { path: urlPath } }>
    { ({ error, data, loading }) => {
      if (error) throw error
      if (loading) return null

      const metatags = normalizeMetatags(data)

      return <Metatags metatags={ metatags } />
    } }
  </Query>
)

MetatagsContainer.propTypes = {
  path: string.isRequired
}

export default MetatagsContainer
