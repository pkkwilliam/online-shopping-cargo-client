import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import BackgroundCard from "../common/backgroundCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import Info from "../text/info";
import InfoBlack from "../text/infoBlack";
import ApplicationOutlineButton from "../common/applicationOutlineButton";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import { PAYMENT_CASH, PAYMENT_TYPES } from "./shipToHome.view";
import UserProfileComponent from "../common/userProfileComponent";
import { getDisplayTime } from "../../util/dateUtil";

const ApplicationConfirmModal = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/applicationConfirmModal")
);

export default class ShipToHomeOrderView extends UserProfileComponent {
  render() {
    const { confirmModal, onCloseConfirmModal, shipToHomeOrders } = this.props;
    const Orders = shipToHomeOrders.map((order) => (
      <Order order={order} {...this.props} />
    ));
    return (
      <ApplicationComponentView>
        <ApplicationConfirmModal
          onClose={onCloseConfirmModal}
          {...confirmModal}
        />
        <View
          style={{
            flexDirection: "column",
          }}
        >
          {Orders}
        </View>
      </ApplicationComponentView>
    );
  }
}

function Order(props) {
  const {
    onClickDeleteShipToHomeOrder,
    onClickMakePayment,
    onClickOrderDetail,
    order,
  } = props;
  const {
    createTime,
    id,
    cost,
    paid,
    parcels,
    paymentChannel,
    shippingProviderOrderNumber,
    shipToHomeStatus,
  } = order;
  return (
    <BackgroundCard style={{ marginBottom: 15 }}>
      <View
        onClick={() => onClickOrderDetail(order)}
        style={{ justifyContent: "space-between" }}
      >
        <View style={{ flexDirection: "column" }}>
          <InfoBlack style={{ fontSize: 12 }}>{`單號: ${id}`}</InfoBlack>
          <InfoBlack style={{ fontSize: 12 }}>{`物流單號: ${
            shippingProviderOrderNumber ?? "N/A"
          }`}</InfoBlack>
          <InfoBlack style={{ fontSize: 12 }}>{`創單時間: ${getDisplayTime(
            createTime
          )}`}</InfoBlack>
        </View>
        <OrderStatus {...order} />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <View>
          <Info>{`含${parcels.length}個包裹`}</Info>
          <Info style={{ marginLeft: 8 }}>送貨上門</Info>
        </View>
        <View>
          <P
            style={{ color: styleSchema.color.primaryDark }}
          >{`運費: $${cost}`}</P>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <PaymentInfo {...order} />
        <ShipToHomeOrderButtonRow
          onClickDeleteShipToHomeOrder={onClickDeleteShipToHomeOrder}
          onClickMakePayment={onClickMakePayment}
          {...order}
        />
      </View>
    </BackgroundCard>
  );
}

function OrderStatus({ paid, paymentChannel, shipToHomeStatus }) {
  let label;
  if (paymentChannel !== PAYMENT_CASH.key && !paid) {
    label = "等待支付";
  } else {
    switch (shipToHomeStatus) {
      case "DELIVERED":
        label = "送達";
        break;
      case "ORDER_RECEIVED":
        label = "正在準備";
        break;
      case "PREPARING":
        label = "正在打包";
        break;
      default:
        label = "未知";
    }
  }
  return <P>{label}</P>;
}

function PaymentInfo({ paid, paymentChannel }) {
  const paymentType = PAYMENT_TYPES.find((type) => type.key === paymentChannel);
  return <Info>支付方式: {paymentType.header}</Info>;
}

function ShipToHomeOrderButtonRow({
  id,
  onClickDeleteShipToHomeOrder,
  onClickMakePayment,
  paid,
  paymentChannel,
}) {
  if (isProcessableOrder(paid, paymentChannel)) {
    return (
      <View style={{ alignItems: "center" }}>
        <ApplicationOutlineButton
          onClick={() => onClickDeleteShipToHomeOrder({ id })}
          style={{ marginRight: 10 }}
          variant="danger"
        >
          取消訂單
        </ApplicationOutlineButton>
        <ApplicationButton onClick={() => onClickMakePayment({ id })} size="sm">
          馬上支付
        </ApplicationButton>
      </View>
    );
  }
  return null;
}

export function isProcessableOrder(paid, paymentChannel) {
  return paymentChannel !== PAYMENT_CASH.key && !paid;
}
