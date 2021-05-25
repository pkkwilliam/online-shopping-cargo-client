import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import ShipToHomeView from "./shipToHome.view";
import { ADDRESS } from "../../routes";
import {
  GET_ALL_ADDRESS_BY_USER,
  GET_PARCELS,
} from "online-shopping-cargo-parent/dist/service";

class ShipToHome extends UserProfileComponent {
  state = {
    ...this.state,
    cost: 0,
    loading: false,
    parcels: [],
  };

  componentDidMount() {
    super.componentDidMount();
    this.getAddress();
    this.getShipToHomeParcels();
  }

  render() {
    const { selectedAddress } = this.appState.address;
    return (
      <ShipToHomeView
        selectedAddress={selectedAddress}
        onClickParcel={this.onClickParcel}
        onClickSelectAddressButton={this.onClickSelectAddressButton}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }

  getAddress() {
    if (this.appState.address.dirty) {
      this.serviceExecutor
        .execute(GET_ALL_ADDRESS_BY_USER())
        .then((addresses) => this.appState.address.setAddress(addresses));
    }
  }

  async getShipToHomeParcels() {
    const parcelInfo = await this.serviceExecutor.execute(GET_PARCELS());
    const shipToHomeParcels = parcelInfo.parcels.filter(
      (parcel) => parcel.parcelType === "SHIP_TO_HOME"
    );
    this.setState({
      parcels: shipToHomeParcels,
    });
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

export default withRouter(ShipToHome);
