import React from "react";
import { withRouter } from "react-router-dom";
import ShipToHomeView, { PAYMENT_CASH } from "./shipToHome.view";
import { ADDRESS, SHIP_TO_HOME_ORDER_CONFIRMATION } from "../../routes";
import {
  READY_FOR_COMBINE,
  WAREHOUSE_RECEIVED,
} from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import {
  CREATE_SHIP_TO_HOME_ORDER,
  REQUEST_SHIPMENT_ESTIMATE,
} from "online-shopping-cargo-parent/dist/service";
import OnlinePayment, { MpayForm } from "../onlinePayment/onlinePayment";

class ShipToHome extends OnlinePayment {
  state = {
    ...this.state,
    shipToHomeCostEstimate: {
      cost: 0,
      discount: 0,
      hasDiscount: false,
      parcelCount: 0,
    },
    selectedPaymentType: undefined,
    showPaymentType: false,
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getAddress();
    this.appStateService.getParcels();
    // call calculate cost again since once address is selected and coming back to current page, the total cost will lost because its in local state
    this.calculateCost();
  }

  render() {
    const { address, parcel } = this.appState;
    return (
      <ShipToHomeView
        orderValid={this.checkOrderValid()}
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

  async calculateCost() {
    this.loadingStart();
    const selectedParcels = this.appState.parcel.parcels.filter(
      (parcel) => parcel.selected
    );
    const shipToHomeCostEstimate = await this.serviceExecutor.execute(
      REQUEST_SHIPMENT_ESTIMATE(selectedParcels)
    );
    this.setState({
      shipToHomeCostEstimate,
    });
    this.loadingEnd();
  }

  checkOrderValid() {
    const { address, parcel } = this.appState;
    const { selectedPaymentType } = this.state;
    const selectedParcels = parcel.parcels.filter((parcel) => parcel.selected);
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

  generateShipToHomeRequestBody() {
    const { address, parcel } = this.appState;
    const { selectedPaymentType } = this.state;
    const selectedParcels = parcel.parcels.filter((parcel) => parcel.selected);
    return {
      address: address.selectedAddress,
      destination: "MACAU",
      parcels: selectedParcels,
      paymentChannel: selectedPaymentType.key,
    };
  }

  onClickParcel = (clickedParcel) => {
    const parcels = this.appState.parcel.parcels.map((parcel) => {
      if (parcel.id === clickedParcel.id) {
        parcel.selected = !parcel.selected;
      }
      return parcel;
    });
    this.appState.parcel.setParcel(parcels);
    this.updateElectronicPaymentFormData();
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
    this.updateElectronicPaymentFormData();
    this.setState({
      isElectronicPaymentChannel: selectedPaymentType !== PAYMENT_CASH,
      selectedPaymentType,
      showPaymentType: false,
    });
  };

  onClickSubmit = async () => {
    this.setModalLoading({ show: true, text: "提交訂單中" });
    if (this.checkOrderValid()) {
      const requestBody = this.generateShipToHomeRequestBody();
      this.submitElectronicPaymentChannelOrder(requestBody);
      this.serviceExecutor
        .execute(CREATE_SHIP_TO_HOME_ORDER(requestBody))
        .then((shipToHomeOrder) => {
          this.appState.parcel.setParcelDirty();
          this.appState.shipToHome.setShipToHomeDirty();
          this.goToReplace(SHIP_TO_HOME_ORDER_CONFIRMATION, {
            shipToHomeOrder,
          });
        })
        .finally(() => this.setModalLoading({ show: false }));
    }
  };

  updateElectronicPaymentFormData() {
    if (this.checkOrderValid() && this.state.isElectronicPaymentChannel) {
      this.requestShipToHomeMpayPaymentFormParams(
        this.generateShipToHomeRequestBody()
      );
    }
  }

  submitElectronicPaymentChannelOrder(shipToHome) {
    this.requestShipToHomeMpayPaymentFormParams(shipToHome);
  }
}

export function getShipToHomeParcels(parcels) {
  return parcels.filter(
    (parcel) =>
      parcel.active &&
      parcel.parcelType === "SHIP_TO_HOME" &&
      (parcel.parcelStatus === WAREHOUSE_RECEIVED.key ||
        parcel.parcelStatus === READY_FOR_COMBINE.key)
  );
}

export default withRouter(ShipToHome);
