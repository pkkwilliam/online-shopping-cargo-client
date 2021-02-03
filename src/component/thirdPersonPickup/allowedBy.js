import React from "react";
import AllowedByView from "./allowedBy.view";
import {
  GET_THIRD_PERSONS_ALLOWED_BY,
  GET_THIRD_PERSONS_PICKUP_CODE,
} from "online-shopping-cargo-parent/dist/service";
import PickupQRCode from "../pickupQRCode/pickupQRCode";

export default class AllowedBy extends PickupQRCode {
  state = {
    ...this.state,
    allowedBy: [],
    countryCode: "",
    showQRCodeModal: false,
    smsNumber: "",
  };

  initialServiceRequest() {
    this.getAllowedBy();
  }

  render() {
    const { pickupCode, qrCodeExpireCountDown } = this.state;
    return (
      <AllowedByView
        onClickPhoneNumber={this.onClickPhoneNumber}
        onCloseModal={this.onCloseError}
        onCloseQRCodeModal={this.onCloseQRCodeModal}
        onGetPickupQrCode={this.onGetPickupQrCode}
        pickupCode={pickupCode}
        qrCodeExpireCountDown={qrCodeExpireCountDown}
        {...this.state}
      />
    );
  }

  getAllowedBy() {
    this.serviceExecutor
      .execute(GET_THIRD_PERSONS_ALLOWED_BY())
      .then((allowedBy) => this.setState({ allowedBy }));
  }

  getQrCodeRequest() {
    const { countryCode, smsNumber } = this.state;
    return GET_THIRD_PERSONS_PICKUP_CODE({
      countryCode,
      smsNumber,
    });
  }

  onClickPhoneNumber = (countryCode, smsNumber) => {
    this.setState({ countryCode, smsNumber });
    setTimeout(() => this.onGetPickupQrCode(), 300);
  };

  onCloseQRCodeModal = () => {
    this.setState({
      countryCode: "",
      pickupCode: "",
      showQRCodeModal: false,
      smsNumber: "",
    });
  };
}
