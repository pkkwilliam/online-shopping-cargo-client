import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import BackgroundCard from "../common/backgroundCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import Info from "../text/info";
import InfoBlack from "../text/infoBlack";

export default function ShipToHomeOrderView(props) {
  const { onClickOrderDetail, shipToHomeOrders } = props;
  const Orders = shipToHomeOrders.map((order) => (
    <Order onClickOrderDetail={onClickOrderDetail} order={order} />
  ));
  return (
    <ApplicationComponentView>
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

function Order(props) {
  const { onClickOrderDetail, order } = props;
  const { id, cost, parcels, shippingProviderOrderNumber, shipToHomeStatus } =
    order;
  return (
    <BackgroundCard
      onClick={() => onClickOrderDetail(order)}
      style={{ marginBottom: 15 }}
    >
      <View style={{ justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <InfoBlack style={{ fontSize: 12 }}>{`單號: ${id}`}</InfoBlack>
          <InfoBlack
            style={{ fontSize: 12 }}
          >{`物流單號: ${shippingProviderOrderNumber}`}</InfoBlack>
        </View>
        <P>{getShipToHomeStatus(shipToHomeStatus)}</P>
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
      <View></View>
    </BackgroundCard>
  );
}

function getShipToHomeStatus(status) {
  switch (status) {
    case "DELIVERED":
      return "送達";
    case "ORDER_RECEIVED":
      return "已接收訂單";
    case "PREPARING":
      return "正在打包";
    default:
      return "未知";
  }
}
