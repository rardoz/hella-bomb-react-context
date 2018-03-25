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

  changeState = (newState = {}) => {
    this.setState({ ...newState });
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            changeState: this.changeState
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
