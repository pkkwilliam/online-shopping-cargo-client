import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import QRCode from "qrcode.react";
import Button from "react-bootstrap/esm/Button";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";

export default class PickupQRCodeView extends ApplicationComponentView {
  render() {
    const { onGetPickupQrCode, pickupCode } = this.props;
    return (
      <this.Wrapper>
        <View style={styles.rootContainer}>
          <this.QRCodeSection value={pickupCode} />
          <Button onClick={onGetPickupQrCode} variant={"link"}>
            刷新
          </Button>
        </View>
      </this.Wrapper>
    );
  }

  QRCodeSection({ value }) {
    return value ? <QRCode value={value} /> : null;
  }
}

const styles = {
  rootContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 20,
  },
};
