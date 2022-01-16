import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import Form from "react-bootstrap/esm/Form";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import ShopList from "../shopList/shopList";
import InstructionText from "../common/instructionText";
import ClientApplicationFormField from "../common/clientApplicationFormField";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default class AddressGeneratorView extends ApplicationComponentView {
  render() {
    const {
      onClickCopyableTextField,
      onClickRestart,
      onSelectShop,
      receiveAddress,
      shopSelected,
      userProfile,
    } = this.props;
    return (
      <this.Wrapper>
        {shopSelected ? (
          <AddressCopyBoard
            onClickCopyableTextField={onClickCopyableTextField}
            receiveAddress={receiveAddress}
            onClickRestart={onClickRestart}
            shopSelected={shopSelected}
            userProfile={userProfile}
          />
        ) : (
          <ShopList onSelectShop={onSelectShop} />
        )}
      </this.Wrapper>
    );
  }
}

function RestartButton({ onClickRestart }) {
  return (
    <ApplicationTextButton
      block
      onClick={onClickRestart}
      style={{ fontSize: 14 }}
    >
      重新開始
    </ApplicationTextButton>
  );
}

function AddressCopyBoard({
  userProfile,
  receiveAddress,
  shopSelected,
  onClickCopyableTextField,
  onClickRestart,
}) {
  const {
    city,
    district,
    province,
    receiverNumber,
    receiverPrefix,
    remark,
    street,
  } = receiveAddress;
  const smsNumber = generateReadablePhoneNumber(userProfile.smsNumber);
  const { shopNumber } = shopSelected;
  return (
    <>
      <InstructionText>
        請逐個複製以下欄位並複製至購物平台收貨地址處
      </InstructionText>
      <AddressRemark remark={remark} />
      <Form style={{ marginTop: 15 }}>
        <CopyableTextField
          label={"收件人"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={`${receiverPrefix}-${shopNumber} ${smsNumber}`}
        />
        <CopyableTextField
          label={"收貨人電話"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={receiverNumber}
        />
        <CopyableTextField
          label={"收貨地址"}
          onClickCopyableTextField={onClickCopyableTextField}
          textarea
          value={`${province}${city}${district}${street} ${shopNumber} ${smsNumber}`}
        />
      </Form>
      <RestartButton onClickRestart={onClickRestart} />
      <BannedItemsDisclaimer />
    </>
  );
}

function AddressRemark({ remark }) {
  if (remark) {
    return (
      <div style={{ marginTop: 15 }}>
        <h5>註意</h5>
        <P style={{ color: "red", fontSize: 16 }}>{remark}</P>
      </div>
    );
  }
  return null;
}

function CopyableTextField({
  label,
  textarea,
  value,
  onClickCopyableTextField,
}) {
  return (
    <ClientApplicationFormField
      as={textarea ? "textarea" : "input"}
      label={label}
      // onClick={() => onClickCopyableTextField(label, value)}
      readOnly
      value={value}
    />
  );
}

function generateReadablePhoneNumber(phoneNumber) {
  return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
}

function BannedItemsDisclaimer(props) {
  return (
    <div style={{ marginTop: 15 }}>
      <h5>禁運物品</h5>
      <P style={{ color: "red", fontSize: 16 }}>*煙酒生鮮、仿牌、危化品</P>
    </div>
  );
}
