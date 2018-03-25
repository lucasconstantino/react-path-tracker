# React Path Tracker

:paw_prints: Easily track traveled paths on highly dynamic or recursive React trees.

[![Build status](https://travis-ci.org/lucasconstantino/react-path-tracker.svg?branch=master)](https://travis-ci.org/lucasconstantino/react-path-tracker)

## Installation

```
npm install react-path-tracker
```

## Motivation

I was once working on a layout builder for React which had some recursive needs; we had rows, which could have items, which could have rows of their own, and thus items of their own. Rendering was no big deal, but having the editing capability on this recursive tree was tricky. On each item, it was important to record what exactly was the path traveled to reach it, so that I could perform alterations such as dragging the item to a new location or resizing it. That why we created PathTracker with an easy render prop API and no logic attached, so to make it easy to use regardless on what components are making the recursion happen.

## How does it work

This project exposes a `PathTracker` component - responsible for registering the traveled path - and a `PathConsumer` component - responsible for accessing the registered path.

## Usage

### API

#### PathTracker

Prop | Type | Default | Description
---------|------|---------|------------
`path` | Array | `[]` | Traveled path to register.
`reset` | Boolean | `false` | Reset path from this point down.
`children` | Element | `null` | React element.

#### PathConsumer

Prop | Type | Default | Description
---------|------|---------|------------
`children` | Function | `void` | Function to render underlying elements ([render prop](https://reactjs.org/docs/render-props.html)).
`children.args[0]` | Array | `[]` | The currently registered traveled path.

### Example

For the following code:

```js
import { PathTracker, PathConsumer } from 'react-path-tracker'

const list = [
  { title: 'First', items: [{ title: 'First/First' }, { title: 'First/Second' }] },
  { title: 'Second', items: [{ title: 'Second/First', items: [{ title: 'Second/First/First' }] }] }
]

const List = ({ items = [] }) => (
  <ul>
    items.map(({ title, items }, index) => (
      <li key={ title }>
        <PathTracker path={ ['items', index] }>
          <Item title={ title } items={ items } />
        </PathTracker>
      </li>
    ))
  </ul>
)

const Item = ({ title, items = [] }) => (
  <PathConsumer>
    { path => (
      <div>
        <h3>{ title }</h3>
        Path: <pre>{ JSON.stringify(path) }</pre>
        { items.length && <List items={ items } /> }
      </div>
    ) }
  </PathConsumer>
)

render(<List items={ list } />)
```

...expect the following markup:

```html
<ul>
  <li>
    <div>
      <h3>First</h3>
      Path: <pre>["items",0]</pre>
      <ul>
        <li>
          <div>
            <h3>First/First</h3>
            Path: <pre>["items",0,"items",0]</pre>
          </div>
        </li>
        <li>
          <div>
            <h3>First/Second</h3>
            Path: <pre>["items",0,"items",1]</pre>
          </div>
        </li>
      </ul>
    </div>
  </li>
    <li>
      <div>
        <h3>Second</h3>
        Path: <pre>["items",1]</pre>
        <ul>
          <li>
            <div>
              <h3>Second/First</h3>
              Path: <pre>["items",1,"items",0]</pre>
              <ul>
                <li>
                  <div>
                    <h3>Second/First/First</h3>
                    Path: <pre>["items",1,"items",0,"items",0]</pre>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
</ul>
```

## License

Copyright (c) 2018 Lucas Constantino Silva

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
