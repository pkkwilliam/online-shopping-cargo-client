import React from "react";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import TrackingView from "./tracking.view";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";

class Tracking extends UserProfileComponent {
  state = {
    ...this.state,
    showDetaiDisplayId: 0,
  };

  initialServiceRequest() {
    this.appStateService.getParcels();
  }

  render() {
    const sortedParcels = new ParcelDisplayUtil().sortParcels(
      this.appState.parcel.parcels
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
    this.setState((state) => ({
      showDetaiDisplayId:
        state.showDetaiDisplayId !== displayId ? displayId : 0,
    }));
  };

  onError = (exception) => {
    this.setError({
      show: true,
      body: `讀取包裹出錯，請稍候再試\n${exception.message}`,
      header: "AWS 伺服器出錯 🤕🤕",
    });
  };
}

export default withRouter(Tracking);
