import React from "react";
import Table from "react-bootstrap/esm/Table";
import TrackingDetail from "./trackingDetail";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default class TrackingView extends ApplicationComponentView {
  render() {
    const { onClickShowDetail, showDetaiDisplayId, sortedParcels } = this.props;
    let parcelRows = sortedParcels?.map((parcel) => {
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
        <Table borderless>
          <thead>
            <tr className="text-center">
              <th>狀態</th>
              <th>單號</th>
              <th>地點</th>
            </tr>
          </thead>
          <tbody>{parcelRows}</tbody>
        </Table>
        {EmptyParcel}
        <p style={styles.reminder}>*僅顯示所有未簽收包裹及30天內的歷史紀錄</p>
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

const styles = {
  reminder: {
    fontSize: 9,
    margin: 0,
  },
};
