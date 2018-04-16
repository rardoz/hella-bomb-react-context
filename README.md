# 💣 💥 Hella Bomb React Context 16.3.x 💥  💣

[![npm version](https://badge.fury.io/js/hella-bomb-react-context.svg)](https://badge.fury.io/js/hella-bomb-react-context)
[![dependencies](https://david-dm.org/rardoz/hella-bomb-react-context.svg?sanitize=true)](https://github.com/rardoz/hella-bomb-react-context/blob/master/package.json)
[![coverage](https://raw.githubusercontent.com/rardoz/hella-bomb-react-context/master/badges/coverage.svg?sanitize=true)](https://circleci.com/gh/rardoz/hella-bomb-react-context)
[![test](https://circleci.com/gh/rardoz/hella-bomb-react-context.svg?style=svg)](https://circleci.com/gh/rardoz/hella-bomb-react-context)

This is a [React 16.3 Context API](https://github.com/reactjs/rfcs/blob/master/text/0002-new-version-of-context.md) component that greatly reduces the complexity of handling global state. ✌Duces Redux! Finally!!! Clean, simple, and lean state management.

## 🧠 Example usage

Wrap your application in a `StateProvider` component. You can extend the `StateProvider` to setup your own initial state and custom actions.

```jsx
import { StateProvider } from 'hella-bomb-react-context'
import App from './app'

export default class extends React.Component {
  render() {
    return (
      <StateProvider
        initialState={{/*SET INITIAL STATE HERE*/}}
        actions={{/*ADD CUSTOM ACTIONS*/}}
      >
        <App />
      </StateProvider>
    )
  }
}
```

All of the child components now have access to the global state. 
Set state and read state by calling `actions.changeState` within a `Consumer` component.

```jsx
import { Consumer } from 'hella-bomb-react-context'
export default () => (
  <Consumer>
    {({ state, actions }) => (
      <button
        onClick={() => actions.changeState({ count: state.count + 1 })}
      >
        Click to increase count {state.count}
      </button>
    )}
  </Consumer>
)
```

Add an action to the global provider.

```jsx
export default () => (
  <Consumer>
    {({ state, actions }) => (
      <button
        onClick={() => actions.addActions({
          test: () => actions.changeState({thing: true})
        })}
      >
        ...
      </button>
    )}
  </Consumer>
)
```

Async consumer example

In `/app/index.js`

```jsx
import React, { Component } from 'react'
import { StateProvider } from 'hella-bomb-react-context'
import App from '/app';
import {GetExample} from '/consumers/example'

export default class extends Component {
  render() {
    return (
      <StateProvider>
        <GetExample>
          <App />
        </GetExample>
      </StateProvider>
    )
  }
}
```

In `/consumers/example.js`  

```jsx
import React from 'react'
import { Consumer } from 'hella-bomb-react-context'

const exampleCall = ({limit = 20, offset = 0, sort = 'id asc'}) => {
  return new Promise((resolve, reject) => {
    resolve({ data: [], message: 'Ok', success: true })
  })
    .then(e => e)
    .catch(e => ({
      success: false,
      message: e.message
    }))
}

const GetExample = (props) => (
  <Consumer>
    {({ state = { exampleLoading: false }, actions = {} }) => {
      if (!state.exampleLoading && !state.example) {
        actions.changeState({ exampleLoading: true })
        exampleCall({limit: 20, offset: 0}).then(e => {
          actions.changeState({example: e, exampleLoading: false})
        })
      }
      return props.children
    }}
  </Consumer>
)

export { GetExample }
```

Scope state in a consumer complex example

```jsx
import React, { Fragment } from 'react'
import { Consumer } from 'hella-bomb-react-context'
import { isEmpty, get } from 'lodash'
import { ROUTES } from './constants'

const { CONSUMER_KEY, URL } = ROUTES.API.CSV.GET

const initialState = {
  fetch: false,
  loading: false,
  response: {},
  data: null
}

const getData = ({
  id = 0,
  params = {},
  changeState,
  state
}) => {

  return global.fetch(URL, {body: JSON.stringify(params)})
    .then(response => {
      if (response.status === 200) {
        changeState({
          [CONSUMER_KEY]: {
            success: true,
            data: response.body.json && response.body.json(),
            fetch: false,
            loading: false
          },
          submitRun: false
        })
      } else {
        changeState({
          [CONSUMER_KEY]: {
            loading: false,
            success: false,
            message: response.statusText,
            fetch: false
          },
          submitRun: false
        })
      }
    })
    .catch(err => {
      changeState({
        [CONSUMER_KEY]: { success: false, message: err.message },
        submitRun: false
      })
    })
}

const applyInitialState = (state = {}) => {
  const mergedState = Object.assign({}, { [CONSUMER_KEY]: initialState }, state || {})
  return mergedState[CONSUMER_KEY]
}

const CSVReadConsumer = (props = {}) => (
  <Fragment>
    <Consumer>
      {({
        state,
        actions = {}
      }) => {
        const mergedState = applyInitialState(state)
        return <props.children state={mergedState} actions={actions} />
      }}
    </Consumer>
  </Fragment>
)

const CSVFetchConsumer = (props = { fetch: false }) => (
  <Fragment>
    <Consumer>
      {({
        state,
        actions = {}
      }) => {

        const mergedState = applyInitialState(state)
        if (mergedState.fetch || props.fetch) {
          actions.changeState({
            [CONSUMER_KEY]: {
              ...mergedState,
              fetch: false,
              loading: true
            },
            submitRun: true
          })
          getData({
            id: 0,
            changeState: actions.changeState,
            state: mergedState,
            params: {}
          })
        } else if (isEmpty(state[CONSUMER_KEY])) {
          actions.changeState({ [CONSUMER_KEY]: initialState })
        }

        return <props.children state={mergedState} actions={{
          changeState: (newState) => {
            actions.changeState({ [CONSUMER_KEY]: { ...mergedState, ...newState } })
          }
        }} />
      }}
    </Consumer>
  </Fragment>
)

export { CSVReadConsumer, CSVFetchConsumer }
```

## 🧞 Contribution Guidelines

Feel free to open a PR! Please update/add tests.

## 🦖 Development

* Pull down the latest from github.
* Run `npm install`
* Modify the /src/index.js file
* Run tests `npm test`

## 🌈 Support me 

📠 [Linkedin](https://linkedin.com/in/rardoz)

📸 [Instagram](https://instagram.com/rardoz)

👽 [Zardoz CS](http://zardozcs.com)

🧙 [Spellcaster](http://spellcstr.com/app/)

👨‍🎤 [neon.computer](http://neon.computer)