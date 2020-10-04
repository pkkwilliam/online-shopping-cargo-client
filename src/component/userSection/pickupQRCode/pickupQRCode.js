import React from "react";
import ApplicationComponent from "../../../common/applicationComponent";
import { GET_PICKUP_QR_CODE } from "../../../common/service";
import QRCode from "qrcode.react";
import View from "../../../common/view";

const TextButton = React.lazy(() => import("../../../common/text/textButton"));

export default class PickupQRCode extends ApplicationComponent {
  state = {};

  componentDidMount() {
    this.onGetPickupQrCode();
  }

  render() {
    if (this.state.pickupQrCodeResponse) {
      return (
        <View style={styles.rootContainer}>
          <QRCode value={this.state.pickupQrCodeResponse.pickupCode} />
          <TextButton onClick={() => this.onGetPickupQrCode()}>刷新</TextButton>
        </View>
      );
    } else {
      return <div>讀取中</div>;
    }
  }

  onGetPickupQrCode() {
    this.serviceExecutor
      .execute(GET_PICKUP_QR_CODE())
      .then((pickupQrCodeResponse) => {
        this.setState({
          pickupQrCodeResponse,
        });
        setTimeout(() => {
          this.onGetPickupQrCode();
        }, pickupQrCodeResponse.expire * 1000);
      });
  }
}

const styles = {
  rootContainer: {
    alignItems: "center",
    flexDirection: "column",
    padding: 5,
  },
};
