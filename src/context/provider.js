import React, { Component } from "react";

export const CargoManagementContext = React.createContext();

export class Provider extends Component {
  state = {
    address: {
      addresses: [],
      selectedAddress: {},
      dirty: true,
    },
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
    const { address, notificationToken, user } = this.state;
    return (
      <CargoManagementContext.Provider
        value={{
          address: {
            ...address,
            setAddress: this.setAddress,
            setAddressDirty: this.setAddressDirty,
          },
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

  // Address
  setAddress = (addresses) => {
    this.setState({
      address: {
        addresses,
        dirty: false,
      },
    });
  };

  setAddressDirty = () => {
    this.setState((state) => ({
      address: {
        ...state.address,
        dirty: true,
      },
    }));
  };

  setSelectedAddress = (address) => {
    this.setState((state) => ({
      address: {
        ...state.address,
        selectedAddress: address,
      },
    }));
  };

  // Notification
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

  // User Profile
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
