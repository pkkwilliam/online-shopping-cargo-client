import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import OrderConfirmationView from "./shipToHomeOrderConfirmation.view";

class ShipToHomeOrderConfirmation extends UserProfileComponent {
  state = {
    ...this.state,
    shipToHomeOrder: {
      address: {},
      cost: 0,
      discount: 0,
      parcels: [],
      paymentType: undefined,
    },
  };

  componentDidMount() {
    const { shipToHomeOrder } = this.routerParams;
    this.setState({ shipToHomeOrder });
  }

  render() {
    return (
      <OrderConfirmationView
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }
}

export default withRouter(ShipToHomeOrderConfirmation);
