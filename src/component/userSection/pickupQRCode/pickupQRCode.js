import React from "react";
import { GET_PICKUP_QR_CODE } from "online-shopping-cargo-parent/dist/service";
import ClientApplicationComponent from "../../clientApplicationComponent";
import PickupQRCodeView from "./pickupQRCode.view";

export default class PickupQRCode extends ClientApplicationComponent {
  qrCodeExpireCountDownInterval;
  qrCodeTimeout;

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
        });
        const qrExpire = pickupQrCodeResponse.expire;
        this.qrCodeExpireAutoRequest(qrExpire);
        this.qrCodeExpireCountDown(qrExpire);
      })
      .catch((ex) => {});
  };

  qrCodeExpireAutoRequest(qrExpire) {
    clearTimeout(this.qrCodeTimeout);
    this.qrCodeTimeout = setTimeout(() => {
      this.onGetPickupQrCode();
    }, qrExpire * 1000);
  }

  qrCodeExpireCountDown(qrCodeExpireCountDown) {
    clearInterval(this.qrCodeExpireCountDownInterval);
    this.setState({
      qrCodeExpireCountDown,
    });
    this.qrCodeExpireCountDownInterval = setInterval(() => {
      this.setState((state) => ({
        qrCodeExpireCountDown: state.qrCodeExpireCountDown - 1,
      }));
    }, 1000);
  }
}
