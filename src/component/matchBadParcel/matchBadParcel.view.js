import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import InstructionText from "../common/instructionText";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationColumnTextField from "online-shopping-cargo-parent/dist/applicationColumnTextField";
import Form from "react-bootstrap/esm/Form";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Dropdown from "react-bootstrap/esm/Dropdown";

export default class MatchBadParcelView extends ApplicationComponentView {
  render() {
    const {
      loading,
      onChangeOriginalTrackingNumber,
      onClickSubmit,
      originalTrackingNumber,
      onSelectedShop,
      shops,
      shopSelected,
    } = this.props;
    return (
      <this.Wrapper>
        <InstructionText>請輸入包裹的原單號以進行認領</InstructionText>
        <div style={{ marginTop: 15 }}>
          <OriginalTrackingNumberTextField
            onChangeOriginalTrackingNumber={onChangeOriginalTrackingNumber}
            originalTrackingNumber={originalTrackingNumber}
          />
        </div>
        <LineBreak />
        <div style={{ marginTop: 15 }}>
          <ShopList
            shops={shops}
            onSelectedShop={onSelectedShop}
            shopSelected={shopSelected}
          />
        </div>
        <SubmitButton
          disabled={loading || !originalTrackingNumber || !shopSelected}
          onClickSubmit={onClickSubmit}
        />
      </this.Wrapper>
    );
  }
}

function OriginalTrackingNumberTextField({
  onChangeOriginalTrackingNumber,
  originalTrackingNumber,
}) {
  return (
    <ApplicationColumnTextField
      label="原單號"
      onChange={(event) => onChangeOriginalTrackingNumber(event.target.value)}
      placeHolder={"SF92XXXXXXXXXXX"}
      value={originalTrackingNumber}
    />
  );
}

function ShopList(props) {
  const { onSelectedShop, shops, shopSelected } = props;
  const ShopDropdownItems = shops.map((shop) => {
    return (
      <Dropdown.Item onSelect={() => onSelectedShop(shop)}>
        {generateShopNumberAndName(shop)}
      </Dropdown.Item>
    );
  });
  return (
    <View>
      <Form style={{ width: "100%" }}>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>自提門店</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light" style={{ width: "100%" }}>
              {shopSelected
                ? generateShopNumberAndName(shopSelected)
                : "請選擇門店"}
            </Dropdown.Toggle>
            <Dropdown.Menu>{ShopDropdownItems}</Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>
    </View>
  );
}

function SubmitButton(props) {
  const { onClickSubmit } = props;
  return (
    <ApplicationButton
      block
      onClick={onClickSubmit}
      style={{ marginTop: 15 }}
      {...props}
    >
      認領
    </ApplicationButton>
  );
}

function generateShopNumberAndName(shop) {
  return `${shop.shopNumber} - ${shop.shopName}`;
}
