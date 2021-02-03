import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Phone from "react-bootstrap-icons/dist/icons/phone";
import PickupQRCodeView from "../pickupQRCode/pickupQRCode.view";
import ApplicationModal from "online-shopping-cargo-parent/dist/applicationModal";
import BlankContainer from "../common/blankContainer";
import PhoneNumberDisplay from "../common/phoneNumberDisplay";

export default class AllowedByView extends PickupQRCodeView {
  render() {
    return (
      <this.Wrapper>
        <AllowedByNumberContainer {...this.props} />
        <this.QRCodeModal />
      </this.Wrapper>
    );
  }

  QRCodeModal = () => {
    const { onCloseQRCodeModal, pickupCode, smsNumber } = this.props;
    return (
      <ApplicationModal
        header={`${smsNumber}取件碼`}
        onClose={onCloseQRCodeModal}
        show={pickupCode && pickupCode !== ""}
      >
        <this.QRCodeSection {...this.props} />
      </ApplicationModal>
    );
  };
}

function AllowedByNumberContainer(props) {
  return (
    <BlankContainer headerText="選擇收件人號碼">
      <AllowedByList {...props} />
      <LineBreak dark />
    </BlankContainer>
  );
}

function AllowedByList({ allowedBy, onClickPhoneNumber }) {
  if (!allowedBy || allowedBy.length === 0) {
    return <P>請先讓收件人在賬戶裡添加你的號碼作為收件人</P>;
  } else {
    return (
      <View style={{ flexDirection: "column", width: "100%" }}>
        {allowedBy.map((user, index) => {
          const { countryCode, smsNumber } = user;
          return (
            <View
              style={{
                flexDirection: "column",
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <PhoneNumberDisplay
                countryCode={countryCode}
                onClick={() => onClickPhoneNumber(countryCode, smsNumber)}
                smsNumber={smsNumber}
              />
              {index < allowedBy.length - 1 ? <LineBreak /> : null}
            </View>
          );
        })}
      </View>
    );
  }
}
