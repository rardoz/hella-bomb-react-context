import React, { Component } from "react";
import ReactDOM from "react-dom";
import { StateProvider, Consumer } from "./index";

let actionAdded = false

const CountButton = () => (
  <Consumer>
    {({ state: { count = 0 }, actions }) => (
      <button id="countTestBtn" onClick={() => actions.changeState({ count: count + 1 })}>
        {count}
      </button>
    )}
  </Consumer>
);

const ActionTestButton = () => (
  <Consumer>
    {({ state: { testDeepState = []}, actions: {changeState, testDeep}}) => (
      <button id="actionTestBtn" onClick={() => testDeep(changeState)}>
        {testDeepState[0] && testDeepState[0].test ? 'cool' : 'not cool'}
      </button>
    )}
  </Consumer>
);


const AddActionTestButton = () => (
  <Consumer>
    {({ state: { testDeepState = [], cool = false}, actions: {addActions, changeState, testDeep, boom}}) => (
      <div>
          <button id="addActionBtn" onClick={() => {
             addActions({
              boom: () => changeState({cool: !cool})
            })
          }}>
            ;)
          </button>
          <button id="addActionTestBtn" onClick={boom}>
            {cool ? 'hella bomb' : 'not hella bomb'}
          </button>
        </div>
    )}
  </Consumer>
);

const App = () => (
  <div id="app-container">
    <CountButton />
    <ActionTestButton />
    <AddActionTestButton />
  </div>
);

class TestComponent extends Component {
  render() {
    return (
      <StateProvider
        initialState={
          {
            count: 6,
            testDeepState: [{test: false}]
          }
        }
        actions={
          {
            testDeep: changeState => changeState({testDeepState: [{test: true}]})
          }
        }
      >
        <App />
      </StateProvider>
    );
  }
}

describe("💣 💥 Hella Bomb React Context 💥 💣", () => {
  let container, countButton, actionButton, addActionButton, addActionTestButton;

  beforeAll(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<TestComponent />, container);
  });

  beforeEach(() => {
    countButton = document.getElementById("countTestBtn")
    actionButton = document.getElementById("actionTestBtn")
    addActionTestButton = document.getElementById("addActionTestBtn")
    addActionButton = document.getElementById("addActionBtn")
  })

  it("should accept initial state", () => {
    expect(countButton.textContent).toBe("6");
  });

  it("should update state", () => {
    countButton.click();
    expect(countButton.textContent).toBe("7");
    countButton.click();
    expect(countButton.textContent).toBe("8");
  })

  it("should have custom actions", () => {
      expect(addActionTestButton.textContent).toBe("not hella bomb");
      addActionTestButton.click()
      expect(addActionTestButton.textContent).toBe("not hella bomb");
      addActionButton.click()
      addActionTestButton.click()
      expect(addActionTestButton.textContent).toBe("hella bomb");
   })
});
