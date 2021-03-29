import React, { Component } from "react";

export const CargoManagementContext = React.createContext();

export class Provider extends Component {
  state = {
    notificationToken: {
      dirty: true,
      token: undefined,
    },
    user: {
      dirty: true,
      userProfile: {},
    },
  };

  render() {
    const { notificationToken, user } = this.state;
    return (
      <CargoManagementContext.Provider
        value={{
          notificationToken: {
            ...notificationToken,
            setNotificationToken: this.setNotificationToken,
            setNotificationTokenDirty: this.setNotificationTokenDirty,
          },
          user: {
            ...user,
            setUserDirty: this.setUserDirty,
            setUserProfile: this.setUserProfile,
          },
        }}
      >
        {this.props.children}
      </CargoManagementContext.Provider>
    );
  }

  setNotificationToken = (token) => {
    console.log("set notification token:", token);
    this.setState({
      notificationToken: {
        dirty: true,
        token,
      },
    });
  };

  setNotificationTokenDirty = (dirty) => {
    this.setState((state) => ({
      notificationToken: {
        ...state.notificationToken,
        dirty,
      },
    }));
  };

  setUserDirty = (dirty) => {
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
