import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import MatchBadParcelViev from "./matchBadParcel.view";
import { MATCH_BAD_PARCEL } from "online-shopping-cargo-parent/dist/service";

export default class MatchBadParcel extends ClientApplicationComponent {
  state = { ...this.state, originalTrackingNumber: "" };

  render() {
    return (
      <MatchBadParcelViev
        onChangeOriginalTrackingNumber={this.onChangeOriginalTrackingNumber}
        onClickSubmit={this.onClickSubmit}
        onCloseModal={this.onCloseError}
        {...this.state}
      />
    );
  }

  onChangeOriginalTrackingNumber = (originalTrackingNumber) => {
    this.setState({ originalTrackingNumber });
  };

  matchBadParcelServiceRequest() {
    this.serviceExecutor
      .execute(MATCH_BAD_PARCEL(this.state.originalTrackingNumber))
      .then((parcelResponse) => {
        this.onSucess(parcelResponse);
      });
  }

  onClickSubmit = () => {
    this.matchBadParcelServiceRequest();
  };

  onSucess(parcelResponse) {
    const { originalTrackingNumber } = this.state;
    const {
      openingHour,
      shopAddress,
      shopName,
      shopNumber,
      shopPhoneNumber,
    } = parcelResponse.shop;
    this.setState({
      modal: {
        body: `${originalTrackingNumber}已被成功認領\n\n-----以下詳細可在 "我的包裹" 再次查看-----\n\n取任站: ${shopNumber} ${shopName}\n取件地址: ${shopAddress}\n營業時間: ${openingHour}\n門店電話: ${shopPhoneNumber}`,
        header: "成功認領",
        show: true,
      },
      originalTrackingNumber: "",
    });
  }
}
