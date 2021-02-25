import React, { useState } from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Form from "react-bootstrap/esm/Form";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import ApplicationTextField from "online-shopping-cargo-parent/dist/applicationTextField";
import ShopList from "../shopList/shopList";
import CaretDownFill from "react-bootstrap-icons/dist/icons/caret-down-fill";
import CaretUpFill from "react-bootstrap-icons/dist/icons/caret-up-fill";
import View from "online-shopping-cargo-parent/dist/view";
import SuceedIcon from "../common/suceedIcon";

const ALERT_PHONE_NUMBER = "香港或澳門的手機號碼";
const ALERT_SHOP_NUMBER = "代收店號";

const INITIAL_STATE = {
  phoneNumber: "",
  shopNumber: "",
  show: false,
  showShopList: false,
  copied: false,
};

let textArea;

export default function AddressGenerator(props) {
  const [values, setValues] = useState(INITIAL_STATE);
  return values.show ? (
    <GeneratedAddressTextAreaSection setValues={setValues} values={values} />
  ) : (
    <GenerateSection setValues={setValues} values={values} />
  );
}

function GenerateSection({ setValues, values }) {
  const { phoneNumber, shopNumber } = values;
  return (
    <div style={{ marginTop: 10, width: "inherit" }}>
      <InputField setValues={setValues} values={values} />
      <SubmitButton
        onClick={() => {
          if (validateFields(phoneNumber, shopNumber)) {
            setValues({ ...values, show: true, showShopList: false });
          }
        }}
      >
        創建收貨地址
      </SubmitButton>
      <ShopListSecrtion setValues={setValues} values={values} />
    </div>
  );
}

function copyToClipboard(values, setValues) {
  textArea.select();
  document.execCommand("copy");
  textArea.blur();
  setValues({ ...values, copied: true });
}

function InputField({ values, setValues }) {
  return (
    <>
      <ApplicationTextField
        label={"代收店號"}
        placeholder={`11xx`}
        onChange={(event) =>
          setValues({ ...values, shopNumber: event.target.value })
        }
      />
      <LineBreak />
      <ApplicationTextField
        label={"手機號碼"}
        placeholder={"6xxxxxxx"}
        onChange={(event) =>
          setValues({ ...values, phoneNumber: event.target.value })
        }
      />
    </>
  );
}

function GeneratedAddressTextAreaSection({ setValues, values }) {
  const { copied, phoneNumber, shopNumber } = values;
  let Content;
  if (copied) {
    Content = <SuceedIcon style={{ marginTop: 10 }}>複制成功</SuceedIcon>;
  } else {
    Content = (
      <SubmitButton onClick={() => copyToClipboard(values, setValues)}>
        復制
      </SubmitButton>
    );
  }
  return (
    <>
      <Form.Control
        as="textarea"
        ref={(textarea) => (textArea = textarea)}
        rows={3}
        style={{ fontSize: 12, resize: "none" }}
        value={`收件人: ${shopNumber}_${generateReadablePhoneNumber(
          phoneNumber
        )}\n手机号码: 15363530392\n珠海市香洲区吉柠路38号15号库`}
      />
      {Content}
      <ApplicationTextButton
        block
        onClick={() => setValues(INITIAL_STATE)}
        style={{ fontSize: 14 }}
      >
        重新開始
      </ApplicationTextButton>
    </>
  );
}

function ShopListSecrtion({ setValues, values }) {
  const { showShopList } = values;
  return (
    <>
      <ApplicationTextButton
        variant="link"
        onClick={() => setValues({ ...values, showShopList: !showShopList })}
      >
        <View style={{ alignItems: "center" }}>
          <P>附近代收店</P>
          {showShopList ? <CaretUpFill /> : <CaretDownFill />}
        </View>
      </ApplicationTextButton>
      {showShopList ? <ShopList /> : null}
    </>
  );
}

function SubmitButton({ children, onClick }) {
  return (
    <ApplicationButton block onClick={onClick} style={{ marginTop: 10 }}>
      {children}
    </ApplicationButton>
  );
}

function generateReadablePhoneNumber(phoneNumber) {
  let result = "";
  for (let index = 0; index < phoneNumber.length; index++) {
    result += phoneNumber[index];
    if ((index + 1) % 4 === 0) {
      result += "_";
    }
  }
  return result.substring(0, result.length - 1);
}

function validateFields(phoneNumber, shopNumber) {
  let validated = false;
  let alertText = "請輸入";
  if (!phoneNumber && !shopNumber) {
    alertText += ` ${ALERT_SHOP_NUMBER} 及 ${ALERT_PHONE_NUMBER} `;
  } else if (!shopNumber) {
    alertText += ALERT_SHOP_NUMBER;
  } else if (!phoneNumber || phoneNumber.length !== 8) {
    alertText += ALERT_PHONE_NUMBER;
  } else {
    validated = true;
  }
  if (!validated) {
    alert(alertText);
  }
  return validated;
}
