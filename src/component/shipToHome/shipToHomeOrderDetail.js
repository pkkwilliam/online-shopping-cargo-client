import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import ShipToHomeOrderDetailView from "./shipToHomeOrderDetail.view";

class ShipToHomeOrderDetail extends UserProfileComponent {
  state = {
    ...this.state,
    order: { parcels: [] },
  };

  componentDidMount() {
    super.componentDidMount();
    const { order } = this.routerParams;
    this.setState({ order });
  }

  render() {
    return (
      <ShipToHomeOrderDetailView
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }
}

export default withRouter(ShipToHomeOrderDetail);
