import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import QRCode from "qrcode.react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";

export default class PickupQRCodeView extends ApplicationComponentView {
  render() {
    const { onGetPickupQrCode, pickupCode, qrCodeExpireCountDown } = this.props;
    return (
      <this.Wrapper>
        <p>{`自動刷新(${qrCodeExpireCountDown})`}</p>
        <View style={styles.qrCodeContainer}>
          <this.QRCodeSection value={pickupCode} />
          <P onClick={onGetPickupQrCode} style={styles.refreshButton}>
            刷新
          </P>
        </View>
      </this.Wrapper>
    );
  }

  QRCodeSection({ value }) {
    return value ? <QRCode value={value} /> : null;
  }
}

const styles = {
  refreshButton: {
    color: "#007AFF",
    fontSize: 16,
    marginTop: 10,
  },
  qrCodeContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 10,
  },
};
