import React from "react";
import { GET_PICKUP_QR_CODE } from "online-shopping-cargo-parent/dist/service";
import ClientApplicationComponent from "../../clientApplicationComponent";
import PickupQRCodeView from "./pickupQRCode.view";

export default class PickupQRCode extends ClientApplicationComponent {
  state = {
    ...this.state,
    pickupQrCodeResponse: {
      pickupCode: undefined,
      expire: 0,
    },
  };

  componentDidMount() {
    this.onGetPickupQrCode();
  }

  render() {
    const { pickupCode } = this.state.pickupQrCodeResponse;
    return (
      <PickupQRCodeView
        pickupCode={pickupCode}
        onCloseModal={this.onCloseError}
        onGetPickupQrCode={this.onGetPickupQrCode}
        {...this.state}
      />
    );
  }

  onGetPickupQrCode = () => {
    this.serviceExecutor
      .execute(GET_PICKUP_QR_CODE())
      .then((pickupQrCodeResponse) => {
        this.setState({
          pickupQrCodeResponse,
        });
        setTimeout(() => {
          this.onGetPickupQrCode();
        }, pickupQrCodeResponse.expire * 1000);
      })
      .catch((ex) => {
        this.props.showModal({
          show: true,
          body: `讀取QR Code出錯，請稍候再試\n${ex.message}`,
          header: "出錯啦 🤪🤪",
        });
      });
  };
}
