import React from "react";
import { GET_PARCELS } from "online-shopping-cargo-parent/dist/service";
import ClientApplicationComponent from "../../clientApplicationComponent";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import TrackingView from "./tracking.view";

export default class Tracking extends ClientApplicationComponent {
  state = {
    ...this.state,
    parcelResponses: {
      parcels: [],
    },
    showDetaiDisplayId: 0,
  };

  componentDidMount() {
    this.onTrack();
  }

  render() {
    const sortedParcels = new ParcelDisplayUtil().sortParcels(
      this.state.parcelResponses?.parcels
    );
    return (
      <TrackingView
        onClickShowDetail={this.onClickShowDetail}
        onCloseModal={this.onCloseError}
        showDetaiDisplayId={this.state.showDetaiDisplayId}
        sortedParcels={sortedParcels}
        {...this.state}
      />
    );
  }

  onClickShowDetail = (displayId) => {
    this.setState({
      showDetaiDisplayId: displayId,
    });
  };

  onTrack() {
    this.serviceExecutor
      .execute(GET_PARCELS())
      .then((parcelResponses) =>
        this.setState({
          parcelResponses,
        })
      )
      .catch((ex) =>
        this.setError({
          show: true,
          body: `讀取包裹出錯，請稍候再試\n${ex.message}`,
          header: "出錯啦 🤪🤪",
        })
      );
  }
}
