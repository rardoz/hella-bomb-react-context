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
    //initial state goes here
  };

  addToState = (newState = {}) => {
    this.setState({ ...newState });
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            setState: (state = {}) => this.addToState(state)
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
