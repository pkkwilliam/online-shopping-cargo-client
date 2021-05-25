import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import BackgroundCard from "../common/backgroundCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import {
  ArrowRightShort,
  Check,
  Circle,
  GeoAltFill,
  Truck,
} from "react-bootstrap-icons";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import { Badge, Table } from "react-bootstrap";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";

export default function ShipToHomeView(props) {
  return (
    <ApplicationComponentView>
      <View
        style={{
          flexDirection: "column",
          height: "inherit",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <AddressSection {...props} />
          <ParcelSection {...props} />
        </View>
        <View>
          <BottomTab {...props} />
        </View>
      </View>
    </ApplicationComponentView>
  );
}

function AddressSection({ selectedAddress, onClickSelectAddressButton }) {
  let Address;
  if (selectedAddress) {
    const { contactName, phoneNumber, street, unit } = selectedAddress;
    Address = (
      <View style={{ alignItems: "center" }}>
        <View
          style={{ ...styles.iconFillBackground, padding: 8, marginRight: 8 }}
        >
          <GeoAltFill style={{ ...styles.iconFill, fontSize: 18 }} />
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <P style={{ fontWeight: 600 }}>{`${contactName} ${phoneNumber}`}</P>
          <P>{`${street} ${unit}`}</P>
        </View>
      </View>
    );
  } else {
    Address = (
      <Chooseable onClick={onClickSelectAddressButton} text="請選擇收貨地址" />
    );
  }
  return (
    <BackgroundCard style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {Address}
        <View onClick={onClickSelectAddressButton}>
          <ArrowRightShort
            style={{ color: styleSchema.color.secondaryDark, fontSize: 28 }}
          />
        </View>
      </View>
    </BackgroundCard>
  );
}

function BottomTab({ cost, parcels }) {
  return (
    <BackgroundCard
      style={{
        alignItems: "center",
        borderRadius: 100,
        display: "flex",
        justifyContent: "space-between",
        marginTop: 15,
        padding: 10,
      }}
    >
      <View></View>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            height: "min-conent",
            marginRight: 8,
            justifyContent: "center",
          }}
        >
          <P
            style={{
              alignSelf: "flex-end",
              color: styleSchema.color.secondaryDark,
              fontSize: 12,
              marginRight: 5,
            }}
          >
            包含所有費用
          </P>
          <P>合計:</P>
          <P style={{ color: styleSchema.color.primaryDark, marginLeft: 3 }}>
            {`$${cost}`}
          </P>
        </View>
        <ApplicationButton>
          <Truck style={{ marginRight: 5 }} />
          送貨
        </ApplicationButton>
      </View>
    </BackgroundCard>
  );
}

function Chooseable({ onClick, text }) {
  return (
    <View
      onClick={onClick}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <P style={styles.prompText}>{text}</P>
    </View>
  );
}

function ParcelSection({ onClickParcel, parcels }) {
  const parcelDisplayUtil = new ParcelDisplayUtil();

  const ParcelRows = parcels.map((parcel) => {
    const parcelStatusBageAndLabel =
      parcelDisplayUtil.getParcelStatusBageAndLabel(parcel.parcelStatus);
    return (
      <ParcelRow
        onClickParcel={onClickParcel}
        parcel={parcel}
        parcelStatusBageAndLabel={parcelStatusBageAndLabel}
      />
    );
  });
  return (
    <BackgroundCard
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <Table borderless>
        <thead>
          <tr className="text-center">
            <th></th>
            <th>狀態</th>
            <th>單號</th>
            <th>費用</th>
          </tr>
        </thead>
        <tbody>{ParcelRows}</tbody>
      </Table>
    </BackgroundCard>
  );
}

function ParcelRow({ onClickParcel, parcel, parcelStatusBageAndLabel }) {
  const {
    cost,
    displayId,
    originalTrackingNumber,
    parcelLocation,
    parcelStatus,
    selected,
  } = parcel;
  return (
    <tr
      className="text-center"
      onClick={() => {
        onClickParcel(parcel);
      }}
    >
      <td>
        {selected ? (
          <Check style={styles.iconFill} />
        ) : (
          <Circle style={styles.icon} />
        )}
      </td>
      <td>
        <Badge pill variant={parcelStatusBageAndLabel.badge}>
          {parcelStatusBageAndLabel.label}
        </Badge>
      </td>
      <td>{originalTrackingNumber}</td>
      <td
        style={{
          color: styleSchema.color.primaryDark,
          fontWeight: 300,
        }}
      >
        {`$${cost}`}
      </td>
    </tr>
  );
}

function PaymentSection() {
  return <View>ParcelSection</View>;
}

const styles = {
  icon: {
    color: styleSchema.color.secondaryDark,
  },
  iconFill: {
    backgroundColor: styleSchema.color.primaryDark,
    borderRadius: 30,
    color: styleSchema.color.white,
  },
  iconFillBackground: {
    background: styleSchema.color.primaryGradient,
    borderRadius: 30,
  },
  prompText: {
    color: styleSchema.color.secondaryDark,
    fontSize: 16,
  },
};
