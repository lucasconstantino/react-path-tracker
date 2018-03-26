import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { contextTypes, CONTEXT_NAME } from './utils'

/**
 * Registers a path to the traveled path.
 */
export class PathConsumer extends Component {
  static propTypes = {
    /**
     * @prop {function} Child render prop.
     */
    children: PropTypes.func,
  }

  // Read from context.
  static contextTypes = contextTypes

  render () {
    return this.props.children(this.context[CONTEXT_NAME] || [])
  }
}

/**
 * Higher-Order Component version of PathConsumer.
 */
export const withPath = ComposedComponent => props => (
  <PathConsumer>
    { path => <ComposedComponent { ...props } path={ path } /> }
  </PathConsumer>
)
