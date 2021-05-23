import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import QRCode from "qrcode.react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import BackgroundCard from "../common/backgroundCard";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import ListMenu from "../common/listMenu";
import { ALLOWED_BY, MY_PARCEL } from "../../routes";
import { UsernameSection } from "../userProfile/userProfile.view";
export default class PickupQRCodeView extends ApplicationComponentView {
  render() {
    return (
      <this.Wrapper>
        <div
          style={{
            backgroundColor: styleSchema.color.primaryLight,
            padding: 15,
            paddingTop: 15,
          }}
        >
          <this.QRCodeSection {...this.props} />
          <UsernameSection {...this.props.userProfile} />
          <OptionsSection />
        </div>
      </this.Wrapper>
    );
  }

  QRCodeSection = ({
    onGetPickupQrCode,
    pickupCode,
    qrCodeExpireCountDown,
  }) => {
    const { refreshButton, qrCodeContainer } = styles;
    return (
      <BackgroundCard>
        {qrCodeExpireCountDown <= 0 ? (
          <ExpiredText />
        ) : (
          <CountDown qrCodeExpireCountDown={qrCodeExpireCountDown} />
        )}
        <View style={qrCodeContainer}>
          <QRCode value={pickupCode ?? 0} />
          <P onClick={onGetPickupQrCode} style={refreshButton}>
            刷新
          </P>
        </View>
      </BackgroundCard>
    );
  };
}

function CountDown({ qrCodeExpireCountDown }) {
  // return <p>{`有效時間(${qrCodeExpireCountDown})`}</p>;
  return <p>有效時間:12小時</p>;
}

function ExpiredText() {
  return <p style={{ color: "red" }}>已失效</p>;
}

function OptionsSection() {
  return (
    <ListMenu
      backgroundColor="#FD9B3F"
      hideArrowIcon
      items={[MY_PARCEL, ALLOWED_BY]}
      lineBreakColor="#FEA27A"
      style={{ marginTop: 15 }}
      textColor="white"
    />
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
  },
};
