import PropTypes from 'prop-types'

// Context name.
export const CONTEXT_NAME = '__traveledPath'

// Context types definition.
export const contextTypes = {
  [CONTEXT_NAME]: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  )
}
