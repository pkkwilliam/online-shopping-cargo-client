import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import BackgroundCard from "../common/backgroundCard";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";

export default function AddressView(props) {
  const { addresses, onClickAddress, onClickAddAddress, onClickEditAddress } =
    props;
  const AddressCards = addresses.map((address) => (
    <Address
      address={address}
      onClickAddress={onClickAddress}
      onClickEditAddress={onClickEditAddress}
    />
  ));
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "column" }}>{AddressCards}</View>
      <AddAddress onClickAddAddress={onClickAddAddress} />
    </View>
  );
}

function AddAddress({ onClickAddAddress }) {
  return (
    <ApplicationButton
      block
      onClick={onClickAddAddress}
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <Plus style={{ fontSize: 22 }} />
      創建送貨地址
    </ApplicationButton>
  );
}

function Address({ address, onClickAddress, onClickEditAddress }) {
  const { contactName, defaultShipping, phoneNumber, street, unit } = address;
  return (
    <BackgroundCard
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 15,
      }}
    >
      <View
        onClick={() => onClickAddress(address)}
        style={{ flexDirection: "column" }}
      >
        <P style={{ fontWeight: 500 }}>{`${contactName} ${phoneNumber}`}</P>
        <P>{`${street} ${unit}`}</P>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "100%",
        }}
      >
        <PencilSquare
          onClick={() => onClickEditAddress(address)}
          style={{ color: styleSchema.color.secondaryDark, fontSize: 18 }}
        />
      </View>
    </BackgroundCard>
  );
}
