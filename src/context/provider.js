import React, { Component } from "react";

export const CargoManagementContext = React.createContext();

export class Provider extends Component {
  state = {
    user: {
      dirty: true,
      userProfile: {},
    },
  };

  render() {
    const { user } = this.state;
    return (
      <CargoManagementContext.Provider
        value={{
          user: {
            ...user,
            setUserDirty: this.setUserDitry,
            setUserProfile: this.setUserProfile,
          },
        }}
      >
        {this.props.children}
      </CargoManagementContext.Provider>
    );
  }

  setUserDitry = (dirty) => {
    this.setState((state) => ({
      user: {
        ...state.user,
        dirty,
      },
    }));
  };

  setUserProfile = (userProfile) => {
    console.log("set app state user profile");
    this.setState({
      user: {
        dirty: false,
        userProfile,
      },
    });
  };
}

export const Consumer = CargoManagementContext.Consumer;
