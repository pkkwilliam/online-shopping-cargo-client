import React, { useState } from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Button from "react-bootstrap/esm/Button";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Form from "react-bootstrap/esm/Form";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import ApplicationTextField from "../common/applicationTextField";
import ShopList from "../shopList/shopList";
import BackgroundCard from "../common/backgroundCard";

const INITIAL_STATE = {
  phoneNumber: "",
  shopNumber: "",
  show: false,
  copied: false,
};

let textArea;

export default function AddressGenerator(props) {
  const [values, setValues] = useState(INITIAL_STATE);

  const GeneratedAddress = values.show ? (
    <GeneratedAddressTextArea setValues={setValues} values={values} />
  ) : (
    <InputField values={values} setValues={setValues} />
  );
  const buttonOnClick = () =>
    setValues(values.show ? INITIAL_STATE : { ...values, show: true });

  const buttonText = values.show ? "重新開始" : "生成收貨地址";

  return (
    <>
      <BackgroundCard>
        <div style={{ marginTop: 10, width: "inherit" }}>
          <P>淘寶智能地址填寫</P>
          {GeneratedAddress}
          <ApplicationButton
            block
            onClick={buttonOnClick}
            size="sm"
            style={{ marginTop: 10 }}
          >
            {buttonText}
          </ApplicationButton>
        </div>
      </BackgroundCard>
      <ShopList />
    </>
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
        placeholder={"代收店號"}
        onChange={(event) =>
          setValues({ ...values, shopNumber: event.target.value })
        }
      />
      <LineBreak />
      <ApplicationTextField
        placeholder={"你的手機號"}
        onChange={(event) =>
          setValues({ ...values, phoneNumber: event.target.value })
        }
      />
    </>
  );
}

function GeneratedAddressTextArea({ setValues, values }) {
  const { copied, phoneNumber, shopNumber } = values;
  return (
    <>
      <Form.Control
        as="textarea"
        ref={(textarea) => (textArea = textarea)}
        rows={3}
        style={{ fontSize: 12, resize: "none" }}
        value={`收件人: ${shopNumber}@${phoneNumber}\n手机号码: 15363530392\n珠海市香洲区吉柠路38号15号库`}
      />
      <Button
        block
        onClick={() => copyToClipboard(values, setValues)}
        size="sm"
        variant="link"
      >
        {copied ? "已複制" : "複制"}
      </Button>
    </>
  );
}
