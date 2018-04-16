import React, { Component, createContext } from "react";

// Initialize a context
const Context = createContext("hbrc-global-context");

// This context contains two interesting components
export const { Provider, Consumer } = Context;

export class StateProvider extends Component {
  static defaultProps = {
    children: [],
    initialState: {},
    actions: {}
  };

  state = {
    actions: { ...this.props.actions },
    ...this.props.initialState
  };

  changeState = (newState = {}) => {
    this.setState({ ...newState });
  };

  addActions = (actions = {}) => {
    const actionsState = { ...this.state.actions };
    for (let key in actions) actionsState[key] = actions[key];
    this.setState({ actions: actionsState });
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            changeState: this.changeState,
            addActions: this.addActions,
            ...this.state.actions
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
