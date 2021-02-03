import React from "react";
import { GET_PICKUP_QR_CODE } from "online-shopping-cargo-parent/dist/service";
import PickupQRCodeView from "./pickupQRCode.view";
import UserProfileComponent from "../common/userProfileComponent";

export default class PickupQRCode extends UserProfileComponent {
  qrCodeExpireCountDownInterval;

  state = {
    ...this.state,
    pickupCode: undefined,
    qrCodeExpireCountDown: 0,
  };

  initialServiceRequest() {
    this.onGetPickupQrCode();
  }

  render() {
    const { pickupCode, qrCodeExpireCountDown } = this.state;
    return (
      <PickupQRCodeView
        onCloseModal={this.onCloseError}
        onGetPickupQrCode={this.onGetPickupQrCode}
        pickupCode={pickupCode}
        qrCodeExpireCountDown={qrCodeExpireCountDown}
        {...this.state}
      />
    );
  }

  onError = (exception) => {
    this.setError({
      show: true,
      body: `讀取QR Code出錯，請稍候再試\n${exception.message}`,
      header: "AWS 伺服器出錯 🤕🤕",
    });
  };

  onGetPickupQrCode = () => {
    this.serviceExecutor
      .execute(this.getQrCodeRequest())
      .then((pickupQrCodeResponse) => {
        this.setState({
          pickupCode: pickupQrCodeResponse.pickupCode,
          qrCodeExpireCountDown: pickupQrCodeResponse.expire / 50,
        });
        this.startCountDown();
      })
      .catch((ex) => {});
  };

  // for classes that need to override this method
  getQrCodeRequest() {
    return GET_PICKUP_QR_CODE();
  }

  startCountDown() {
    clearInterval(this.qrCodeExpireCountDownInterval);
    this.qrCodeExpireCountDownInterval = setInterval(() => {
      const { qrCodeExpireCountDown } = this.state;
      this.setState({
        qrCodeExpireCountDown: qrCodeExpireCountDown - 1,
      });
      // set this instead of 0 because setState might take a second to update
      if (qrCodeExpireCountDown <= 1) {
        clearInterval(this.qrCodeExpireCountDownInterval);
      }
    }, 1000);
  }
}
