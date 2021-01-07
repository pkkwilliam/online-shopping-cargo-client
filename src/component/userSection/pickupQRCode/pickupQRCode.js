import React from "react";
import { GET_PICKUP_QR_CODE } from "online-shopping-cargo-parent/dist/service";
import ClientApplicationComponent from "../../clientApplicationComponent";
import PickupQRCodeView from "./pickupQRCode.view";

export default class PickupQRCode extends ClientApplicationComponent {
  qrCodeExpireCountDownInterval;

  state = {
    ...this.state,
    pickupCode: undefined,
    qrCodeExpireCountDown: 0,
  };

  componentDidMount() {
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
      .execute(GET_PICKUP_QR_CODE())
      .then((pickupQrCodeResponse) => {
        this.setState({
          pickupCode: pickupQrCodeResponse.pickupCode,
          qrCodeExpireCountDown: pickupQrCodeResponse.expire / 5,
        });
        this.startCountDown();
      })
      .catch((ex) => {});
  };

  startCountDown() {
    clearInterval(this.qrCodeExpireCountDownInterval);
    this.qrCodeExpireCountDownInterval = setInterval(() => {
      const { qrCodeExpireCountDown } = this.state;
      if (qrCodeExpireCountDown === 0) {
        this.onGetPickupQrCode();
      }
      this.setState({
        qrCodeExpireCountDown: qrCodeExpireCountDown - 1,
      });
    }, 1000);
  }
}
