import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {StateProvider, Consumer} from './index'

const Button = () => (
  <Consumer>
    {({ state: { count = 0 }, actions }) => (
      <button
        onClick={() => actions.setState({ count: count + 1 })}
      >
        {count}
      </button>
    )}
  </Consumer>
)

const App = () =>  (
  <div id="app-container">
    <Button />
  </div>
)

class TestComponent extends Component {
  render(){
    return (
      <StateProvider>
        <App />
      </StateProvider>
    )
  }
}

describe("💣 Hella Bomb React Context", () => {
  let container, btn

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<TestComponent />, container)
    btn = container.getElementsByTagName('button')[0]
  })

  it("should be hella bomb", () => {
    expect(btn.textContent).toBe('0')
    btn.click()
    expect(btn.textContent).toBe('1')
    btn.click()
    expect(btn.textContent).toBe('2')
  });
});
