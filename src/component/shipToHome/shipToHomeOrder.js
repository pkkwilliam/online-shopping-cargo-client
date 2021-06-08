import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import { SHIP_TO_HOME_ORDER_DETAIL } from "../../routes";
import ShipToHomeOrderView from "./shipToHomeOrder.view";

class ShipToHomeOrder extends UserProfileComponent {
  state = {
    ...this.state,
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getAddress();
    this.appStateService.getShipToHomeOrders();
  }

  render() {
    const { shipToHome } = this.appState;

    return (
      <ShipToHomeOrderView
        onClickOrderDetail={this.onClickOrderDetail}
        shipToHomeOrders={sortShipToHomeOrder(shipToHome.shipToHomeOrders)}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }

  onClickOrderDetail = (order) => {
    this.goTo(SHIP_TO_HOME_ORDER_DETAIL, { order });
  };
}

export function sortShipToHomeOrder(orders) {
  return orders.sort((order1, order2) => order2.id - order1.id);
}

export default withRouter(ShipToHomeOrder);
