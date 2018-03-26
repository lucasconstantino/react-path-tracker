import React from 'react'
import { mount } from 'enzyme'

import { PathTracker, PathConsumer, withPath } from 'react-path-tracker'

describe('index', () => {
  const DumbComponent = jest.fn(() => (<div>content</div>))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should transparently render underlying tree', () => {
    const wrapper = mount(
      <PathTracker>
        <PathTracker path={ [1, 2, 3] }>
          <PathConsumer>
            { () => (
              <PathTracker>
                <DumbComponent />
              </PathTracker>
            ) }
          </PathConsumer>
        </PathTracker>
      </PathTracker>
    )

    expect(wrapper.html()).toBe('<div>content</div>')
  })

  it('should consume traveled path', () => {
    mount(
      <PathTracker path={ [1, 2, 3] }>
        <PathConsumer>
          { DumbComponent }
        </PathConsumer>
      </PathTracker>
    )

    expect(DumbComponent).toHaveBeenCalledWith([1, 2, 3])
  })

  it('should consume full traveled path', () => {
    mount(
      <PathTracker path={ [1, 2, 3] }>
        <PathTracker path={ [4, 5, 6] }>
          <PathConsumer>
            { DumbComponent }
          </PathConsumer>
        </PathTracker>
      </PathTracker>
    )

    expect(DumbComponent).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6])
  })

  it('should consume reseted traveled path', () => {
    mount(
      <PathTracker path={ [1, 2, 3] }>
        <PathTracker reset path={ [4, 5, 6] }>
          <PathConsumer>
            { DumbComponent }
          </PathConsumer>
        </PathTracker>
      </PathTracker>
    )

    expect(DumbComponent).toHaveBeenCalledWith([4, 5, 6])
  })

  it('should consume empty traveled path', () => {
    mount(
      <PathTracker>
        <PathConsumer>
          { DumbComponent }
        </PathConsumer>
      </PathTracker>
    )

    expect(DumbComponent).toHaveBeenCalledWith([])
  })

  it('should consume when nested consumer', () => {
    mount(
      <PathTracker path={ [1, 2, 3] }>
        <PathConsumer>
          { () => (
            <PathTracker path={ [4, 5, 6] }>
              <PathConsumer>
                { DumbComponent }
              </PathConsumer>
            </PathTracker>
          ) }
        </PathConsumer>
      </PathTracker>
    )

    expect(DumbComponent).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6])
  })

  describe('withPath', () => {
    it('should inject path property', () => {
      const EnhancedDumbComponent = withPath(DumbComponent)

      mount(
        <PathTracker path={ [1, 2, 3] }>
          <EnhancedDumbComponent />
        </PathTracker>
      )

      expect(DumbComponent).toHaveBeenCalledWith({ path: [1, 2, 3] }, {})
    })
  })
})
