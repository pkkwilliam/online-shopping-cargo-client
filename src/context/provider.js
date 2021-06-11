import React, { Component } from "react";

export const CargoManagementContext = React.createContext();

export class Provider extends Component {
  state = {
    address: {
      addresses: [],
      selectedAddress: {},
      dirty: true,
    },
    announcement: {
      announcements: [],
      dirty: true,
    },
    eyeCatch: {
      baseUrl: "",
      dirty: true,
      images: [],
    },
    notificationToken: {
      dirty: true,
      token: undefined,
    },
    parcel: {
      dirty: true,
      parcels: [],
    },
    shipToHome: {
      dirty: true,
      shipToHomeOrders: [],
    },
    shop: {
      dirty: true,
      shops: [],
    },
    user: {
      dirty: true,
      userProfile: {},
    },
  };

  render() {
    const {
      address,
      announcement,
      eyeCatch,
      notificationToken,
      parcel,
      shipToHome,
      shop,
      user,
    } = this.state;
    return (
      <CargoManagementContext.Provider
        value={{
          address: {
            ...address,
            setAddress: this.setAddress,
            setAddressDirty: this.setAddressDirty,
            setSelectedAddress: this.setSelectedAddress,
          },
          announcement: {
            ...announcement,
            setAnnouncement: this.setAnnouncement,
          },
          eyeCatch: {
            ...eyeCatch,
            setEyeCatch: this.setEyeCatch,
          },
          notificationToken: {
            ...notificationToken,
            setNotificationToken: this.setNotificationToken,
            setNotificationTokenDirty: this.setNotificationTokenDirty,
          },
          parcel: {
            ...parcel,
            setParcel: this.setParcel,
            setParcelDirty: this.setParcelDirty,
          },
          shipToHome: {
            ...shipToHome,
            setShipToHome: this.setShipToHome,
            setShipToHomeDirty: this.setShipToHomeDirty,
          },
          shop: {
            ...shop,
            setShop: this.setShop,
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

  // Announcement
  setAnnouncement = (announcements) => {
    this.setState({
      announcement: {
        announcements,
        dirty: false,
      },
    });
  };

  // Eye Catch
  setEyeCatch = (eyeCatchReesponse) => {
    const { baseUrl, images } = eyeCatchReesponse;
    this.setState({
      eyeCatch: {
        baseUrl,
        dirty: false,
        images,
      },
    });
  };

  // Notification
  setNotificationToken = (token) => {
    console.log(token);
    this.setState((state) => ({
      notificationToken: {
        ...state.notificationToken,
        token,
      },
    }));
  };

  setNotificationTokenDirty = (dirty) => {
    this.setState((state) => ({
      notificationToken: {
        ...state.notificationToken,
        dirty,
      },
    }));
  };

  // Parcels
  setParcel = (parcels) => {
    this.setState({
      parcel: {
        dirty: false,
        parcels,
      },
    });
  };

  setParcelDirty = () => {
    this.setState((state) => ({
      parcel: {
        ...state.parcel,
        dirty: true,
      },
    }));
  };

  // Ship To Home
  setShipToHome = (shipToHomeOrders) => {
    this.setState({
      shipToHome: {
        dirty: false,
        shipToHomeOrders,
      },
    });
  };

  setShipToHomeDirty = () => {
    this.setState((state) => ({
      shipToHome: {
        ...state.shipToHome,
        dirty: true,
      },
    }));
  };

  // Shop
  setShop = (shops) => {
    this.setState({
      shop: {
        dirty: false,
        shops,
      },
    });
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
