import React from "react";
import Table from "react-bootstrap/esm/Table";
import TrackingDetail from "./trackingDetail";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import BackgroundCard from "../common/backgroundCard";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import { Truck } from "react-bootstrap-icons";
import { getShipToHomeParcels } from "../shipToHome/shipToHome";
import Badge from "react-bootstrap/esm/Badge";

export default class TrackingView extends ApplicationComponentView {
  render() {
    const {
      onClickShipToHome,
      onClickShowDetail,
      showDetaiDisplayId,
      sortedParcels,
    } = this.props;
    let parcelRows = sortedParcels
      .filter((parcel) => parcel.parcelType === "STORE_PICKUP")
      .map((parcel) => {
        return (
          <TrackingDetail
            onClickShowDetail={onClickShowDetail}
            parcel={parcel}
            showDetaiDisplayId={showDetaiDisplayId}
          />
        );
      });

    const EmptyParcel =
      !parcelRows || parcelRows.length === 0 ? <this.NoParcel /> : null;

    return (
      <this.Wrapper>
        <ShipToHomeParcelsButton
          onClickShipToHome={onClickShipToHome}
          parcels={sortedParcels}
        />
        <BackgroundCard style={{ marginTop: 15 }}>
          <Table borderless>
            <thead>
              <tr className="text-center">
                <th>狀態</th>
                <th>單號</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{parcelRows}</tbody>
          </Table>
          {EmptyParcel}
          <p style={styles.reminder}>*僅顯示所有未簽收包裹及30天內的歷史紀錄</p>
        </BackgroundCard>
      </this.Wrapper>
    );
  }

  NoParcel = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <P>暫時没有包裹</P>
      </View>
    );
  };
}

function ShipToHomeParcelsButton({ onClickShipToHome, parcels }) {
  const readyForCombine = getShipToHomeParcels(parcels);
  return (
    <BackgroundCard
      onClick={onClickShipToHome}
      style={{
        alignItems: "center",
        background: styleSchema.color.primaryGradient,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Truck
          style={{
            color: styleSchema.color.white,
            fontWeight: 900,
            fontSize: 28,
          }}
        />
        <P
          style={{
            color: styleSchema.color.white,
            fontSize: 18,
            fontWeight: 600,
            marginLeft: 8,
          }}
        >
          送貨上門
        </P>
      </View>
      <View>
        <Badge variant="warning">待處理 x {readyForCombine.length}</Badge>
      </View>
    </BackgroundCard>
  );
}

const styles = {
  reminder: {
    fontSize: 9,
    margin: 0,
  },
};
