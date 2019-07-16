import React, { useRef, useEffect } from 'react'
import * as t from 'prop-types'
import Router from 'next/router'

const HtmlText = ({ html }) => {
  const ref = useRef(null)

  useEffect(() => {
    // Match all relative links to use next router instead
    // We need this to navigate internal links via client-side and not stop the player.
    ref.current.querySelectorAll('a[href^="/"]').forEach(node => {
      node.setAttribute('href', node.getAttribute('href'))
      node.addEventListener('click', event => {
        event.preventDefault()
        Router.push('/drupal', node.getAttribute('href')).then(() =>
          window.scrollTo(0, 0)
        )
      })
    })
  }, [html, ref])

  return <div ref={ ref } dangerouslySetInnerHTML={ { __html: html } } />
}

HtmlText.propTypes = {
  html: t.string
}

export default HtmlText
