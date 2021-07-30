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
import OnlinePayment from "../onlinePayment/onlinePayment";

export class ShipToHome extends OnlinePayment {
  state = {
    ...this.state,
    remark: "",
    shipToHomeCostEstimate: {
      cost: 0,
      discount: 0,
      hasDiscount: false,
      parcelCount: 0,
    },
    selectedPaymentChannel: undefined,
    showPaymentChannel: false,
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
      <>
        <this.MpayForm />
        <ShipToHomeView
          orderValid={this.checkOrderValid()}
          parcels={getShipToHomeParcels(parcel.parcels)}
          selectedAddress={address.selectedAddress}
          onChangeRemark={this.onChangeRemark}
          onClickParcel={this.onClickParcel}
          onClickSelectAddressButton={this.onClickSelectAddressButton}
          onClickShowPaymentChannel={this.onClickShowPaymentChannel}
          onClickSelectPaymentMethod={this.onClickSelectPaymentMethod}
          onClickSubmit={this.onClickSubmit}
          onCloseModal={this.onCloseError}
          onCloseToast={this.onCloseToast}
          {...this.state}
        />
      </>
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
    const { selectedPaymentChannel } = this.state;
    const selectedParcels = parcel.parcels.filter((parcel) => parcel.selected);
    if (
      address.selectedAddress &&
      selectedParcels.length > 0 &&
      selectedPaymentChannel
    ) {
      return true;
    } else {
      return false;
    }
  }

  generateShipToHomeRequestBody() {
    const { address, parcel } = this.appState;
    const { remark, selectedPaymentChannel } = this.state;
    const selectedParcels = parcel.parcels.filter((parcel) => parcel.selected);
    return {
      address: address.selectedAddress,
      destination: "MACAU",
      parcels: selectedParcels,
      paymentChannel: selectedPaymentChannel.key,
      remark,
    };
  }

  onChangeRemark = (remark) => {
    this.setState({
      remark,
    });
  };

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

  onClickShowPaymentChannel = () => {
    this.setState((state) => ({
      showPaymentChannel: !state.showPaymentChannel,
    }));
  };

  onClickSelectPaymentMethod = (selectedPaymentChannel) => {
    this.setState({
      isElectronicPaymentChannel: selectedPaymentChannel !== PAYMENT_CASH,
      selectedPaymentChannel,
      showPaymentChannel: false,
    });
  };

  onClickSubmit = async () => {
    const { isElectronicPaymentChannel } = this.state;
    const requestBody = this.generateShipToHomeRequestBody();
    if (!this.checkOrderValid()) {
      return;
    }
    if (isElectronicPaymentChannel) {
      this.submitElectronicPaymentChannelOrder(requestBody);
    } else {
      this.submitCashPaymentOrder(requestBody);
    }
  };

  submitCashPaymentOrder(requestBody) {
    this.setModalLoading({ show: true, text: "提交訂單中" });
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

  async submitElectronicPaymentChannelOrder(requestBody) {
    this.setModalLoading({ show: true, text: "提交訂單中" });
    await this.requestShipToHomeMpayPaymentFormParams(requestBody);
    this.submitMpayForm();
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
