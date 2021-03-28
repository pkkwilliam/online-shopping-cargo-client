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
  const { name, smsNumber, zyId } = userProfile;
  const { areaShopName, shopNumber } = shopSelected;
  return (
    <>
      <InstructionText>
        請逐個複製以下欄位並複製至購物平台收貨地址處
      </InstructionText>
      <Form style={{ marginTop: 15 }}>
        <CopyableTextField
          label={"收件人"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={`${name}-${smsNumber}_${zyId ?? ""}`}
        />
        <CopyableTextField
          label={"聯繫電話"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={"18928042433"}
        />
        <CopyableTextField
          label={"地區"}
          onClickCopyableTextField={onClickCopyableTextField}
          value={"廣東省-珠海市-香洲區-拱北街道"}
        />
        <CopyableTextField
          label={"收貨地址"}
          onClickCopyableTextField={onClickCopyableTextField}
          textarea
          value={`珠海市夏湾港昌路入中源倉澳提代收${shopNumber}-${areaShopName}(${smsNumber}_${zyId})`}
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
