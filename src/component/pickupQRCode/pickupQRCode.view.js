import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import QRCode from "qrcode.react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";

export default class PickupQRCodeView extends ApplicationComponentView {
  render() {
    return (
      <this.Wrapper>
        <QRCodeSection {...this.props} />
      </this.Wrapper>
    );
  }
}

function QRCodeSection({
  onGetPickupQrCode,
  pickupCode,
  qrCodeExpireCountDown,
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 25,
        margin: 10,
      }}
    >
      <p>{`自動刷新(${qrCodeExpireCountDown})`}</p>
      <View style={styles.qrCodeContainer}>
        <QRCode value={pickupCode ?? 0} />
        <P onClick={onGetPickupQrCode} style={styles.refreshButton}>
          刷新
        </P>
      </View>
    </div>
  );
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
