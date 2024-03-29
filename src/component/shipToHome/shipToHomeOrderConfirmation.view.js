import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import {
  AddressSection,
  ParcelList,
  PaymentSection,
  getPaymentChannelObject,
  ShippingPreference,
} from "./shipToHome.view";
import SuceedIcon from "../common/suceedIcon";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { TotalCost } from "./shipToHomeOrderDetail.view";

export default function ShipToHomeOrderConfirmationView(props) {
  const {
    address,
    cost,
    discount,
    id,
    parcels,
    paymentChannel,
    remark,
    shippingProviderOrderNumber,
  } = props.shipToHomeOrder;
  return (
    <ApplicationComponentView>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SuceedIcon>{`${id}訂單提交成功`}</SuceedIcon>
        <P style={{ marginBottom: 10 }}>專員會在24小時內聯繫你並安排送貨時間</P>
        <AddressSection selectable={false} selectedAddress={address} />
        <PaymentSection
          selectedPaymentChannel={getPaymentChannelObject(paymentChannel)}
        />
        <ShippingPreference remark={remark} />
        <ParcelList
          id={id}
          onClickParcel={() => {}}
          parcels={parcels}
          shippingProviderOrderNumber={shippingProviderOrderNumber}
          selectable={false}
        />
        <TotalCost cost={cost} discount={discount} parcels={parcels} />
      </View>
    </ApplicationComponentView>
  );
}
