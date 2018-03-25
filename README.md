# 💣 💥 Hella Bomb React Context 16.3.0-alpha.x 💥  💣

[![npm version](https://badge.fury.io/js/hella-bomb-react-context.svg)](https://badge.fury.io/js/hella-bomb-react-context)
[![dependencies](https://david-dm.org/username/repo.svgbadge?sanitize=true)](https://github.com/rardoz/hella-bomb-react-context/blob/master/package.json)
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
      <StateProvider>
        <App />
      </StateProvider>
    )
  }
}
```

All of the child components now have access to the global state. You can set state and read state by calling actions.setState within a `Consumer` component as seen below.

```jsx
import { Consumer } from 'hella-bomb-react-context'
export default () => (
  <Consumer>
    {({ state: { count = 0 }, actions }) => (
      <button
        onClick={() => actions.setState({ count: count + 1 })}
      >
        Click to increase count {count}
      </button>
    )}
  </Consumer>
)
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