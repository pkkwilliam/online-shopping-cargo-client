import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import { ADDRESS } from "../../routes";
import ShipToHomeOrderView from "./shipToHomeOrder.view";

class ShipToHomeOrder extends UserProfileComponent {
  state = {
    ...this.state,
    cost: 0,
    loading: false,
    parcels: [],
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getAddress();
    this.appStateService.getShipToHomeOrders();
  }

  render() {
    const { address, parcel } = this.appState;

    return (
      <ShipToHomeOrderView
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
    return parcels;
    // return parcels.filter(
    //   (parcel) => parcel.parcelType === "SHIP_TO_HOME" && parcel.active
    // );
  }

  calculateCost() {
    const cost = this.state.parcels
      .filter((parcel) => parcel.selected)
      .reduce((accmulator, currentValue) => accmulator + currentValue.cost, 0);
    this.setState({
      cost,
    });
  }

  onClickParcel = (clickedParcel) => {
    const parcels = this.state.parcels.map((parcel) => {
      if (parcel.id === clickedParcel.id) {
        parcel.selected = !parcel.selected;
      }
      return parcel;
    });
    this.setState({
      parcels,
    });
    this.calculateCost();
  };

  onClickSelectAddressButton = () => {
    this.goTo(ADDRESS);
  };
}

export default withRouter(ShipToHomeOrder);
