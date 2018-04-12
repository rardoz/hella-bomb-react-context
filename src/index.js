import React, { Component, createContext } from "react";

// Initialize a context
const Context = createContext("hbrc-global-context");

// This context contains two interesting components
export const { Provider, Consumer } = Context;

export class StateProvider extends Component {
  static defaultProps = {
    children: []
  };

  state = {
    actions: [],
    ...this.props.initialState
  };

  changeState = (newState = {}) => {
    this.setState({ ...newState });
  };

  getActionName = (actionObject = {}) => {
    for (key in actionObject) return key;
    return "";
  };

  addActions = (actions = {}, initialState = {}) => {
    const actionsState = { ...this.state.actions };
    for (key in actions) actionsState[key] = actions[key];
    this.setState({ actions: actionsState });
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            changeState: this.changeState,
            addAction: this.addAction,
            ...this.props.actions,
            ...this.state.actions
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
