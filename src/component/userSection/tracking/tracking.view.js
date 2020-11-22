import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import Table from "react-bootstrap/esm/Table";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import Badge from "react-bootstrap/esm/Badge";
import TrackingDetail from "./trackingDetail";

export default function TrackingView(props) {
  const { onClickShowDetail, showDetaiDisplayId, sortedParcels } = props;
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
    <>
      <Table borderless>
        <thead>
          <tr>
            <th>狀態</th>
            <th>單號</th>
            <th>地點</th>
          </tr>
        </thead>
        <tbody>{parcelRows}</tbody>
      </Table>
      <p>remind</p>
    </>
  );
}

function generateRow(parcels) {
  console.log(parcels);
  const parcelDisplayUtil = new ParcelDisplayUtil();
  return parcels.map((parcel) => {
    const parcelStatusBageAndLabel = parcelDisplayUtil.getParcelStatusBageAndLabel(
      parcel.parcelStatus
    );
    const badge = (
      <Badge pill variant={parcelStatusBageAndLabel.badge}>
        {parcelStatusBageAndLabel.label}
      </Badge>
    );
    const location = parcelDisplayUtil.getParcelLocation(parcel.parcelLocation);
    return (
      <tr>
        <td>{badge}</td>
        <td>{parcel.displayId}</td>
        <td>{location}</td>
      </tr>
    );
  });
}
