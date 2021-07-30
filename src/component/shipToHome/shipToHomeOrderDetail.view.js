import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import {
  AddressSection,
  ParcelList,
  PaymentSection,
  PriceText,
  ShippingPreference,
  getPaymentChannelObject,
} from "./shipToHome.view";
import BackgroundCard from "../common/backgroundCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";

export default function ShipToHomeOrderDetailView(props) {
  const {
    address,
    cost,
    discount,
    id,
    parcels,
    paymentChannel,
    remark,
    shippingProviderOrderNumber,
  } = props.order;
  return (
    <ApplicationComponentView>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <AddressSection selectable={false} selectedAddress={address} />
        <PaymentSection
          selectedPaymentChannel={getPaymentChannelObject(paymentChannel)}
        />
        <RemarkSection remark={remark} />
        <TotalCost cost={cost} discount={discount} parcels={parcels} />
        <ParcelList
          id={id}
          onClickParcel={() => {}}
          parcels={parcels}
          selectable={false}
          shippingProviderOrderNumber={shippingProviderOrderNumber}
        />
      </View>
    </ApplicationComponentView>
  );
}

export function RemarkSection({ remark }) {
  if (!remark) {
    return null;
  }
  return <ShippingPreference remark={remark} />;
}

export function TotalCost({ cost, discount, parcels }) {
  const ParcelsCost = parcels.map((parcel, index) => (
    <View style={{ justifyContent: "space-between", width: "inherit" }}>
      <P>{`${index + 1}. ${parcel.originalTrackingNumber}`}</P>
      <P style={{ fontWeight: 500 }}>${parcel.cost}</P>
    </View>
  ));
  return (
    <BackgroundCard
      style={{
        alignItems: "flex-end",
        display: "flex",
        flexDirection: "column",
        marginTop: 15,
      }}
    >
      {ParcelsCost}
      {discount ? <PriceText cost={`-${discount}`} label="折扣:" /> : null}
      <LineBreak />
      <PriceText cost={`${cost}`} label="合計:" />
    </BackgroundCard>
  );
}
