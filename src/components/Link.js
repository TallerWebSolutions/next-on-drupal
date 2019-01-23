import { cloneElement, Children } from 'react'
import NextLink from 'next/link'
import { withRouter } from 'next/router'
import classnames from 'classnames'

/**
 * Increment to Next Link.
 *
 * - Adds active classes.
 *
 */
const Link = withRouter(props => {
  const {
    href,
    router: { pathname },
    activeClass,
    children,
    className,
    ...rest
  } = props

  const child = cloneElement(Children.only(children), {
    className: classnames(className, children.props.className, {
      [activeClass]: pathname === href
    })
  })

  return <NextLink href={ href } children={ child } { ...rest } />
})

Link.defaultProps = {
  activeClass: 'active'
}

export default Link
