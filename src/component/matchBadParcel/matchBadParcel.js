import React from "react";
import MatchBadParcelViev from "./matchBadParcel.view";
import { MATCH_BAD_PARCEL } from "online-shopping-cargo-parent/dist/service";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";

export class MatchBadParcel extends UserProfileComponent {
  state = {
    ...this.state,
    loading: false,
    originalTrackingNumber: "",
    shopSelected: undefined,
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getShops();
  }

  render() {
    return (
      <MatchBadParcelViev
        onChangeOriginalTrackingNumber={this.onChangeOriginalTrackingNumber}
        onClickSubmit={this.onClickSubmit}
        onCloseModal={this.onCloseError}
        onSelectedShop={this.onSelectedShop}
        shops={this.appState.shop.shops}
        {...this.state}
      />
    );
  }

  onChangeOriginalTrackingNumber = (originalTrackingNumber) => {
    this.setState({ originalTrackingNumber });
  };

  matchBadParcelServiceRequest() {
    this.setState({ loading: true });
    this.serviceExecutor
      .execute(
        MATCH_BAD_PARCEL(
          this.state.originalTrackingNumber,
          this.state.shopSelected.shopNumber
        )
      )
      .then((parcelResponse) => {
        this.onSucess(parcelResponse);
        this.appState.parcel.setParcelDirty();
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  onClickSubmit = () => {
    this.matchBadParcelServiceRequest();
  };

  setModal(exception) {
    const { originalTrackingNumber } = this.state;
    super.setModal({
      body: `未能找到原號為${originalTrackingNumber}的包裹\n\n如遇困難，請與客服聯繫\n微信:PickTB`,
      header: "没有包裹🤕🤕",
      show: true,
    });
  }

  onSelectedShop = (shop) => {
    this.setState({ shopSelected: shop });
  };

  onSucess(parcelResponse) {
    const { originalTrackingNumber } = this.state;
    const { openingHour, shopAddress, shopName, shopNumber, shopPhoneNumber } =
      parcelResponse.shop;
    this.setState({
      modal: {
        body: `${originalTrackingNumber}已被成功認領\n\n詳細可在"我的包裹"查看\n\n取任站: ${shopNumber} ${shopName}\n取件地址: ${shopAddress}\n營業時間: ${openingHour}\n門店電話: ${shopPhoneNumber}`,
        header: "成功認領",
        show: true,
      },
      originalTrackingNumber: "",
    });
  }
}

export default withRouter(MatchBadParcel);
