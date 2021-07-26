import React from "react";
import { withRouter } from "react-router-dom";
import { SHIP_TO_HOME_ORDER_DETAIL } from "../../routes";
import ShipToHomeOrderView, {
  isProcessableOrder,
} from "./shipToHomeOrder.view";
import { DELETE_SHIP_TO_HOME_ORDER } from "online-shopping-cargo-parent/dist/service";
import { ShipToHome } from "./shipToHome";
import { isExpiredPaymentOrder } from "../onlinePayment/onlinePayment";
class ShipToHomeOrder extends ShipToHome {
  state = {
    ...this.state,
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getAddress();
    this.appStateService.getShipToHomeOrders(false, {
      callback: () => this.removeUnvalidOrders(),
    });
  }

  render() {
    const { shipToHome } = this.appState;
    return (
      <>
        <this.MpayForm />
        <ShipToHomeOrderView
          onClickDeleteShipToHomeOrder={this.onClickDeleteShipToHomeOrder}
          onClickMakePayment={this.onClickMakePayment}
          onClickOrderDetail={this.onClickOrderDetail}
          shipToHomeOrders={sortShipToHomeOrder(shipToHome.shipToHomeOrders)}
          onCloseConfirmModal={this.onCloseConfirmModal}
          onCloseModal={this.onCloseError}
          onCloseToast={this.onCloseToast}
          {...this.state}
        />
      </>
    );
  }

  onClickDeleteShipToHomeOrder = (order) => {
    const deleteShipToHomeOrderFunction = () => {
      this.serviceExecutor
        .execute(DELETE_SHIP_TO_HOME_ORDER(order))
        .then(() => {
          this.appStateService.getShipToHomeOrders(true);
          this.appStateService.getParcels(true);
        });
    };

    this.setState({
      confirmModal: {
        body: `訂單删除後可在送貨上門服務中重新下單`,
        header: "删除訂單",
        onClickConfirm: deleteShipToHomeOrderFunction,
        show: true,
      },
    });
  };

  onClickMakePayment = async ({ id }) => {
    this.setModalLoading({ show: true, text: "提交訂單中" });
    await this.makeShipToHomeH5Payment({ id });
    this.submitMpayForm();
    this.setModalLoading({ show: false });
  };

  onClickOrderDetail = (order) => {
    this.goTo(SHIP_TO_HOME_ORDER_DETAIL, { order });
  };

  /**
   * this method is to check if electroic payment is still valid to pay
   * since mpay only allows upto 30min to make the payment
   * this should be move to the system instead in the client side
   * we dont want to increase the size of our backend application
   * it will require a quartz in our backend to monitor the timeout orders
   * instead of doing it in the backend, move this to client side
   * before showing the orders, remove all the timeout first
   */
  async removeUnvalidOrders() {
    const { shipToHomeOrders } = this.appState.shipToHome;
    console.log(
      "check and remove unvalid orders if present, number of orders:",
      shipToHomeOrders.length
    );
    shipToHomeOrders.forEach(async (order) => {
      const { createTime, id, paid, paymentChannel } = order;
      const processable = isProcessableOrder(paid, paymentChannel);
      const expired = isExpiredPaymentOrder(createTime);
      if (processable && expired) {
        console.log("remove expired ship to home order:", id);
        this.serviceExecutor.execute(DELETE_SHIP_TO_HOME_ORDER({ id }));
      }
    });
  }
}

export function sortShipToHomeOrder(orders) {
  return orders.sort((order1, order2) => order2.id - order1.id);
}

export default withRouter(ShipToHomeOrder);
