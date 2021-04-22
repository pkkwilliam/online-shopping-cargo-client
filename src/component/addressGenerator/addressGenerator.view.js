import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import Form from "react-bootstrap/esm/Form";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import ShopList from "../shopList/shopList";
import InstructionText from "../common/instructionText";
import ClientApplicationFormField from "../common/clientApplicationFormField";

export default class AddressGeneratorView extends ApplicationComponentView {
  render() {
    const {
      onClickCopyableTextField,
      onClickRestart,
      onSelectShop,
      shopSelected,
      userProfile,
    } = this.props;
    return (
      <this.Wrapper>
        {shopSelected ? (
          <AddressCopyBoard
            onClickCopyableTextField={onClickCopyableTextField}
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
  shopSelected,
  onClickCopyableTextField,
  onClickRestart,
}) {
  const smsNumber = generateReadablePhoneNumber(userProfile.smsNumber);
  const { shopNumber } = shopSelected;
  return (
    <>
      <InstructionText>
        請逐個複製以下欄位並複製至購物平台收貨地址處
      </InstructionText>
      <Form style={{ marginTop: 15 }}>
        <CopyableTextField
          label={"收件人"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={`OT-${shopNumber} ${smsNumber}`}
        />
        <CopyableTextField
          label={"收貨人電話"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={"13392543914"}
        />
        <CopyableTextField
          label={"收貨地址"}
          onClickCopyableTextField={onClickCopyableTextField}
          textarea
          value={`广东省珠海香洲区南屏科技园三精实业想送澳提仓 ${shopNumber} ${smsNumber}`}
        />
      </Form>

      <RestartButton onClickRestart={onClickRestart} />
    </>
  );
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
      onClick={() => onClickCopyableTextField(label, value)}
      readOnly
      value={value}
    />
  );
}

function generateReadablePhoneNumber(phoneNumber) {
  return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
}
