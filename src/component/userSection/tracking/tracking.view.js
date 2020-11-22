import React from "react";
import Table from "react-bootstrap/esm/Table";
import TrackingDetail from "./trackingDetail";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";

export default class TrackingView extends ApplicationComponentView {
  render() {
    const { onClickShowDetail, showDetaiDisplayId, sortedParcels } = this.props;
    const parcelRows = sortedParcels.map((parcel) => {
      return (
        <TrackingDetail
          onClickShowDetail={onClickShowDetail}
          showDetaiDisplayId={showDetaiDisplayId}
          {...parcel}
        />
      );
    });
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
        <p style={styles.reminder}>
          *僅顯示已進入倉庫並未進行最後收件或已收件30天內的包裹
        </p>
      </this.Wrapper>
    );
  }
}

const styles = {
  reminder: {
    fontSize: 9,
    margin: 0,
  },
};
