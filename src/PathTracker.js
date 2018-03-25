import { Component } from 'react'
import PropTypes from 'prop-types'

export const CONTEXT_NAME = '__traveledPath'

export const contextTypes = {
  [CONTEXT_NAME]: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  )
}

/**
 * Registers a path to the traveled path.
 */
export class PathTracker extends Component {
  static propTypes = {
    /**
     * @prop {Array} The to append.
     */
    path: PropTypes.array,

    /**
     * @prop {Boolean} Whether it should reinitialize the traveled path.
     */
    reset: PropTypes.bool,

    /**
     * @prop {Element} Child react element.
     */
    children: PropTypes.node,
  }

  // Read from context.
  static contextTypes = contextTypes

  // Write to context.
  static childContextTypes = contextTypes

  getChildContext () {
    return {
      [CONTEXT_NAME]: (
        this.props.reset
          ? []
          : this.context[CONTEXT_NAME] || []
      ).concat(this.props.path || [])
    }
  }

  render () {
    return this.props.children
  }
}
