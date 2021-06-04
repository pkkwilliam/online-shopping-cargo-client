import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import ShipToHomeView from "./shipToHome.view";
import { ADDRESS } from "../../routes";
import {
  READY_FOR_COMBINE,
  WAREHOUSE_RECEIVED,
} from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import { CREATE_SHIP_TO_HOME_ORDER } from "online-shopping-cargo-parent/dist/service";

class ShipToHome extends UserProfileComponent {
  state = {
    ...this.state,
    loading: false,
    selectedPaymentType: undefined,
    showPaymentType: false,
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
        cost={this.calculateCost(parcel.parcels)}
        orderValid={this.checkOrderValid(
          address,
          parcel.parcels,
          this.state.selectedPaymentType
        )}
        parcels={getShipToHomeParcels(parcel.parcels)}
        selectedAddress={address.selectedAddress}
        onClickParcel={this.onClickParcel}
        onClickSelectAddressButton={this.onClickSelectAddressButton}
        onClickShowPaymentType={this.onClickShowPaymentType}
        onClickSelectPaymentMethod={this.onClickSelectPaymentMethod}
        onClickSubmit={this.onClickSubmit}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }

  calculateCost(parcels) {
    if (parcels) {
      return parcels
        .filter((parcel) => parcel.selected)
        .reduce(
          (accmulator, currentValue) => accmulator + currentValue.cost,
          0
        );
    } else {
      return 0;
    }
  }

  checkOrderValid(address, parcels, selectedPaymentType) {
    const selectedParcels = parcels.filter((parcel) => parcel.selected);
    if (
      address.selectedAddress &&
      selectedParcels.length > 0 &&
      selectedPaymentType
    ) {
      return true;
    } else {
      return false;
    }
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

  onClickShowPaymentType = () => {
    this.setState((state) => ({
      showPaymentType: !state.showPaymentType,
    }));
  };

  onClickSelectPaymentMethod = (selectedPaymentType) => {
    this.setState({
      selectedPaymentType,
      showPaymentType: false,
    });
  };

  onClickSubmit = () => {
    this.setState({
      loading: true,
    });
    const { address, parcel } = this.appState;
    const { selectedPaymentType } = this.state;
    const selectedParcels = parcel.parcels.filter((parcel) => parcel.selected);
    if (this.checkOrderValid(address, selectedParcels, selectedPaymentType)) {
      const requestBody = {
        address: address.selectedAddress,
        parcels: selectedParcels,
        paymentType: selectedPaymentType.key,
      };
      this.serviceExecutor
        .execute(CREATE_SHIP_TO_HOME_ORDER(requestBody))
        .then(() => {
          this.appState.parcel.setParcelDirty();
          this.appState.shipToHome.setShipToHomeDirty();
        })
        .finally(() =>
          this.setState({
            loading: false,
          })
        );
    }
  };
}

export function getShipToHomeParcels(parcels) {
  return parcels.filter(
    (parcel) =>
      parcel.active &&
      parcel.parcelType === "SHIP_TO_HOME" &&
      (parcel.parcelStatus === READY_FOR_COMBINE.key ||
        parcel.parcelStatus === WAREHOUSE_RECEIVED.key)
  );
}

export default withRouter(ShipToHome);
