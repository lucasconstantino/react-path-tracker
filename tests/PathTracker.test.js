import React from 'react'
import { shallow, mount } from 'enzyme'
import { getContext } from 'recompose'

import { PathTracker, CONTEXT_NAME, contextTypes } from 'react-path-tracker'

describe('PathTracker', () => {
  const DumbComponent = () => (<div>content</div>)

  it('should transparently render the underlying tree', () => {
    const wrapper = shallow(
      <PathTracker>
        <DumbComponent />
      </PathTracker>
    )

    expect(wrapper.text()).toBe('<DumbComponent />')
  })

  it('should access traveled path from context', () => {
    const ContextDumbComponent = getContext(contextTypes)(DumbComponent)

    const wrapper = mount(
      <PathTracker path={ [1, 2, 3] }>
        <ContextDumbComponent />
      </PathTracker>
    )

    expect(wrapper.find(DumbComponent).prop(CONTEXT_NAME)).toEqual([1, 2, 3])
  })

  it('should access full traveled path from context', () => {
    const ContextDumbComponent = getContext(contextTypes)(DumbComponent)

    const wrapper = mount(
      <PathTracker path={ [1, 2, 3] }>
        <PathTracker path={ [4, 5, 6] }>
          <ContextDumbComponent />
        </PathTracker>
      </PathTracker>
    )

    expect(wrapper.find(DumbComponent).prop(CONTEXT_NAME)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should not break when no path is provided', () => {
    const ContextDumbComponent = getContext(contextTypes)(DumbComponent)

    const wrapper = mount(
      <PathTracker>
        <PathTracker path={ [1, 2, 3] }>
          <ContextDumbComponent />
        </PathTracker>
      </PathTracker>
    )

    expect(wrapper.find(DumbComponent).prop(CONTEXT_NAME)).toEqual([1, 2, 3])
  })

  describe('[prop] reset', () => {
    it('should be possible to reset traveled path registry', () => {
      const ContextDumbComponent = getContext(contextTypes)(DumbComponent)

      const wrapper = mount(
        <PathTracker path={ [1, 2, 3] }>
          <PathTracker reset path={ [4, 5, 6] }>
            <ContextDumbComponent />
          </PathTracker>
        </PathTracker>
      )

      expect(wrapper.find(DumbComponent).prop(CONTEXT_NAME)).toEqual([4, 5, 6])
    })

    it('should be possible to use reset alone', () => {
      const ContextDumbComponent = getContext(contextTypes)(DumbComponent)

      const wrapper = mount(
        <PathTracker path={ [1, 2, 3] }>
          <PathTracker reset>
            <PathTracker path={ [4, 5, 6] }>
              <ContextDumbComponent />
            </PathTracker>
          </PathTracker>
        </PathTracker>
      )

      expect(wrapper.find(DumbComponent).prop(CONTEXT_NAME)).toEqual([4, 5, 6])
    })
  })
})
