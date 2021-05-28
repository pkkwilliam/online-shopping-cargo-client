import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import { AddressSection, ParcelList } from "./shipToHome.view";

export default function ShipToHomeOrderDetailView(props) {
  const { address, parcels } = props.order;
  return (
    <ApplicationComponentView>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <AddressSection selectable={false} selectedAddress={address} />
        <ParcelList
          onClickParcel={() => {}}
          parcels={parcels}
          selectable={false}
        />
      </View>
    </ApplicationComponentView>
  );
}
