import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import OrderConfirmationView from "./shipToHomeOrderConfirmation.view";

class ShipToHomeOrderConfirmation extends UserProfileComponent {
  state = {
    ...this.state,
    isElectronicPayment: false,
    mpayPaymentResponse: {
      currency: undefined,
      body: undefined,
      out_trans_id: undefined,
      pay_channel_type: undefined,
      sign: undefined,
      sign_type: undefined,
      trans_id: undefined,
      trans_amount: undefined,
      trans_status: undefined,
    },
    shipToHomeOrder: {
      address: {},
      cost: 0,
      discount: 0,
      parcels: [],
      paymentChannel: undefined,
    },
  };

  componentDidMount() {
    this.appStateService.getShipToHomeOrders();
    /**
     * if routerParams present, it means it is a cash payment transaction
     * else mpay will pass back payment info from the url params
     */
    if (this?.routerParams?.shipToHomeOrder) {
      this.setState({
        isElectronicPayment: false,
        shipToHomeOrder: this.routerParams.shipToHomeOrder,
      });
    } else {
      this.processMpayUrlParamResponse();
    }
  }

  render() {
    this.setElectronicPaymentOrder();
    return (
      <OrderConfirmationView
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }

  /**
   * this is for setting payment order object for online payment since it is a call back
   */
  setElectronicPaymentOrder() {
    if (!this.state.shipToHomeOrder?.id && !this.appState.shipToHome.dirty) {
      const systemTransactionId = this.state.mpayPaymentResponse.out_trans_id;
      const shipToHomeOrders = this.appState.shipToHome.shipToHomeOrders;
      const shipToHomeOrder = shipToHomeOrders.find((order) => {
        return order.id == systemTransactionId;
      });
      this.setState({
        shipToHomeOrder,
      });
    }
  }

  processMpayUrlParamResponse() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const currency = urlParams.get("currency");
    const body = urlParams.get("body");
    const out_trans_id = urlParams.get("out_trans_id");
    const pay_channel_type = urlParams.get("pay_channel_type");
    const sign = urlParams.get("sign");
    const sign_type = urlParams.get("sign_type");
    const trans_id = urlParams.get("trans_id");
    const trans_amount = urlParams.get("trans_amount");
    const trans_status = urlParams.get("trans_status");
    this.setState({
      isElectronicPayment: true,
      mpayPaymentResponse: {
        currency,
        body,
        out_trans_id,
        pay_channel_type,
        sign,
        sign_type,
        trans_id,
        trans_amount,
        trans_status,
      },
    });
  }
}

export default withRouter(ShipToHomeOrderConfirmation);
