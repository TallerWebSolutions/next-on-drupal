import React, { memo, Children, PureComponent, Fragment } from 'react'
import { bool, string, node, object, any } from 'prop-types'
import styled, { css } from 'styled-components'
import classnames from 'classnames'
// import { string as toStyleString } from 'to-style'
import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider'

const StylesWrapper = styled.div`
  &.hasAnnotations td.code {
    width: 60%;

    pre {
      white-space: pre-wrap;
    }
  }

  ${({ open, theme: { colors } }) => css`
    margin-left: ${open ? '-10em' : '0'};
    margin-right: ${open ? '-10em' : '0'};

    > div,
    table {
      overflow: visible;
    }

    td,
    th {
      position: relative;
    }

    thead {
      cursor: pointer;
      transition: all 250ms;

      &:hover,
      &:focus {
        color: inherit;
        background-color: #f9fbfc;
      }
    }

    tbody {
      th {
        color: ${colors.theadColor};
        background-color: ${colors.theadBg};
        text-align: right;
        padding: 0 1em;
        width: 1em;
      }

      tr + tr {
        border-top: 0;
      }

      td,
      th {
        padding-top: 0;
        padding-bottom: 0;
        vertical-align: baseline;
      }

      td.code {
        color: ${colors.codeColor};
        background-color: ${colors.codeBg};
      }

      tr.annotated td.code {
        color: #333;
        background-color: white;
        border-left: 2px solid ${colors.primary};
      }

      tr.annotated.last td {
        height: 100%;
      }

      pre {
        margin: 0;
      }
    }

    tfoot {
      color: ${colors.theadColor};
      text-align: right;
      border-top: 1px solid ${colors.border};

      &:hover,
      &:focus {
        color: inherit;
      }

      td {
        padding: 20px 20px;
      }

      ul {
        padding: 0;
        margin: 0 0 0 0.5em;
        display: inline;
        list-style: none;
      }

      li {
        display: inline-block;
        padding: 0 0.5em;
        margin-left: 0.5em;
        border: 1px solid ${colors.border};
        cursor: pointer;
        transition: all 250ms;

        &:hover,
        &:focus {
          border-color: inherit;
        }

        &.active {
          color: ${colors.primary};
          border-color: ${colors.primary};
        }
      }
    }
  `}
`

const ToggleExpands = styled.a`
  position: absolute;
  right: 2em;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

const ExpandCell = styled.td`
  tr:not(:first-child):not(:last-child) & {
    ${({ theme: { colors } }) => css`
      border-bottom: 1px solid ${colors.border};
    `}
  }
`

const Expand = styled.button`
  ${({ theme: { colors } }) => `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 10;
    border: 1px solid;
    color: ${colors.border};
    background-color: white;
    transition: all 250ms;
    cursor: pointer;

    &:hover, &:focus {
      color: ${colors.text};
    }
  `}
`

const defaultLens = { before: 4, after: 4 }

class AnnotatedCode extends PureComponent {
  static propTypes = {
    components: object.isRequired,
    code: string.isRequired,
    initiallyOpen: bool,
    expanded: bool,
    children: node,
    name: string,
    initialStep: any
  }

  static defaultProps = {
    initiallyOpen: true,
    expanded: false,
    initialStep: null
  }

  constructor (props) {
    super(props)

    this.state = {
      expanded: !!props.expanded,
      open: this.props.initiallyOpen,
      step: this.props.initialStep
    }
  }

  toggleBody = () => this.setState({ open: !this.state.open })

  expand = (e, row) => this.toggleExpands(e)

  toggleExpands = e => {
    e.stopPropagation()
    this.setState({ expanded: !this.state.expanded })
  }

  setStep = step => this.setState({ step })

  render () {
    const { name, code, children, components } = this.props
    const { expanded, open } = this.state

    let currentStep = this.state.step
    let hasAnnotations = false

    const marks = {}
    const steps = []
    const lines = code.split('\n')

    // fulfil with collapsed.
    for (let i in lines) {
      marks[i] = { type: expanded ? 'shown' : 'collapsed' }
    }

    Children.forEach(children, ({ props: { step } }) => {
      // register step
      if (steps.indexOf(step) === -1) steps.push(step)
    })

    // assign current step when none defined.
    if (steps.length > 1 && steps.indexOf(currentStep) === -1) {
      currentStep = steps[0]
    }

    Children.forEach(children, (content, index) => {
      const {
        type,
        props: { line: from, to, lens = {}, step = null, children }
      } = content

      // ignore step.
      if (step !== currentStep) return

      // enforce
      hasAnnotations = !!children

      lens.before = lens.before || defaultLens.before
      lens.after = lens.after || defaultLens.after

      if (type.displayName !== Annotation.displayName) {
        throw new Error(
          'AnnotatedCode must have only Annotation components as children'
        )
      }

      const span = to ? to + 1 - from : 1

      marks[from - 1] = { type: 'annotated', span, content }

      for (let i = 0; i < span - 1; i++) {
        marks[from + i] = {
          type: 'annotated',
          isSpan: true,
          last: i === span - 2
        }
      }

      // ignore expands when all expanded.
      if (expanded) return

      // show lines before.
      for (let i = 1; i <= lens.before; i++) {
        const before = from - 1 - i

        if (marks[before] && marks[before].type === 'collapsed') {
          marks[before] = {
            type: i === lens.before && index === 0 ? 'expand' : 'shown',
            up: true,
            down: false
          }
        }
      }

      // show lines after
      for (let i = 1; i <= lens.after; i++) {
        const after = from - 1 + (span - 1) + i

        if (marks[after] && marks[after].type === 'collapsed') {
          marks[after] = {
            type: i === lens.after ? 'expand' : 'shown',
            up: true,
            down: true
          }
        }
      }
    })

    return (
      <StylesWrapper open={ open } className={ classnames({ hasAnnotations }) }>
        <components.table>
          { name && (
            <thead>
              <tr onClick={ this.toggleBody }>
                <th colSpan='3'>
                  { name }
                  { open && (
                    <ToggleExpands onClick={ this.toggleExpands }>
                      { expanded ? 'collapse all' : 'expand all' }
                    </ToggleExpands>
                  ) }
                </th>
              </tr>
            </thead>
          ) }

          { open && (
            <Fragment>
              <tbody>
                { lines.map((line, row) => {
                  // prettier-ignore
                  const {
                    type,
                    isSpan,
                    span,
                    last,
                    content,
                    up,
                    down
                  } = marks[row]

                  switch (type) {
                    case 'collapsed':
                      return null

                    case 'expand':
                      return (
                        <tr key={ row }>
                          <th />
                          <ExpandCell>
                            <Expand
                              onClick={ e => this.expand(e, { row, up, down }) }
                            >
                              ●●●
                            </Expand>
                          </ExpandCell>
                          { hasAnnotations && <td className='annotation' /> }
                        </tr>
                      )

                    case 'shown':
                      return (
                        <tr key={ row }>
                          <th>{ row + 1 }</th>
                          <td className='code'>
                            <pre>
                              <code>{ lines[row] }</code>
                            </pre>
                          </td>
                          { hasAnnotations && <td /> }
                        </tr>
                      )
                  }

                  // annotated.
                  return (
                    <tr key={ row } className={ classnames(type, { last }) }>
                      <th>{ row + 1 }</th>
                      <td className='code'>
                        <pre>
                          <code>{ lines[row] }</code>
                        </pre>
                      </td>
                      { isSpan || !hasAnnotations ? null : (
                        <td rowSpan={ span }>{ content }</td>
                      ) }
                    </tr>
                  )
                }) }
              </tbody>

              { steps.length > 1 && (
                <tfoot>
                  <tr>
                    <td colSpan={ 3 }>
                      steps:
                      <ul>
                        { steps.map(step => (
                          <li
                            key={ step }
                            onClick={ () => this.setStep(step) }
                            className={ classnames({
                              active: step === currentStep
                            }) }
                          >
                            { step }
                          </li>
                        )) }
                      </ul>
                    </td>
                  </tr>
                </tfoot>
              ) }
            </Fragment>
          ) }
        </components.table>
      </StylesWrapper>
    )
  }
}

// This component is not rendered, but used as placeholding.
export const Annotation = withMDXComponents(({ children, ...props }) =>
  typeof children === 'function' ? children(props) : children || null
)

Annotation.displayName = 'Annotation'

export default memo(withMDXComponents(AnnotatedCode))
