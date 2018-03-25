import React from 'react'
import { mount } from 'enzyme'

import { PathConsumer, CONTEXT_NAME } from 'react-path-tracker'

describe('PathConsumer', () => {
  const DumbComponent = jest.fn(() => (<div>content</div>))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should transparently render provided children function', () => {
    const wrapper = mount(
      <PathConsumer>
        { DumbComponent }
      </PathConsumer>
    )

    expect(DumbComponent).toHaveBeenCalled()
    expect(wrapper.text()).toContain('content')
  })

  it('should provide children function with traveled path', () => {
    mount(
      <PathConsumer>
        { DumbComponent }
      </PathConsumer>,
      { context: { [CONTEXT_NAME]: [1, 2, 3] } }
    )

    expect(DumbComponent).toHaveBeenCalledWith([1, 2, 3])
  })

  it('should provide children function with empty path, when nothing is registered', () => {
    mount(
      <PathConsumer>
        { DumbComponent }
      </PathConsumer>
    )

    expect(DumbComponent).toHaveBeenCalledWith([])
  })
})
