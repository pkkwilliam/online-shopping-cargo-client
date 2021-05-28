import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import ShipToHomeView from "./shipToHome.view";
import { ADDRESS } from "../../routes";

class ShipToHome extends UserProfileComponent {
  state = {
    ...this.state,
    cost: 0,
    loading: false,
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getAddress();
    this.appStateService.getParcels();
  }

  render() {
    const { address, parcel } = this.appState;
    return (
      <ShipToHomeView
        parcels={this.getShipToHomeParcels(parcel.parcels)}
        selectedAddress={address.selectedAddress}
        onClickParcel={this.onClickParcel}
        onClickSelectAddressButton={this.onClickSelectAddressButton}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }

  getShipToHomeParcels(parcels) {
    return parcels.filter(
      (parcel) => parcel.parcelType === "SHIP_TO_HOME" && parcel.active
    );
  }

  calculateCost() {
    const cost = this.appState.parcel.parcels
      .filter((parcel) => parcel.selected)
      .reduce((accmulator, currentValue) => accmulator + currentValue.cost, 0);
    this.setState({
      cost,
    });
  }

  onClickParcel = (clickedParcel) => {
    const parcels = this.appState.parcel.parcels.map((parcel) => {
      if (parcel.id === clickedParcel.id) {
        parcel.selected = !parcel.selected;
      }
      return parcel;
    });
    this.appState.parcel.setParcel(parcels);
    this.calculateCost();
  };

  onClickSelectAddressButton = () => {
    this.goTo(ADDRESS);
  };
}

export default withRouter(ShipToHome);
