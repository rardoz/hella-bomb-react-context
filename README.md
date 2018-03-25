# hella-bomb-react-context-from-the-future
This is a React 16.3 Context API component that greatly reduces the complexity of handling global state. ✌Duces Redux! Finally!!! Clean, simple, and lean state management.


## Example usage

Wrap your application in a StateProvider component. You can extend the StateProvider to setup your own initial state and custom actions.

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

All of the child components now have access to the global state. You can set state and read state on the fly by calling actions.setState within a Consumer component as seen below.

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