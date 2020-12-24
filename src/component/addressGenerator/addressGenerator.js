import React, { useState } from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ClientCard from "../common/clientCard";
import FormControl from "react-bootstrap/esm/FormControl";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Form from "react-bootstrap/esm/Form";

const INITIAL_STATE = {
  phoneNumber: "",
  shopNumber: "",
  show: false,
};

let textArea;

export default function AddressGenerator(props) {
  const [values, setValues] = useState(INITIAL_STATE);

  const GeneratedAddress = values.show ? (
    <GeneratedAddressTextArea {...values} />
  ) : (
    <InputField values={values} setValues={setValues} />
  );
  const buttonOnClick = () =>
    setValues(values.show ? INITIAL_STATE : { ...values, show: true });

  const buttonText = values.show ? "重新生成收貨地址" : "生成收貨地址";

  return (
    <ClientCard header={<P>轉運地址</P>}>
      <div style={{ marginTop: 10 }}>
        <Container>
          <P>淘寶智能地址填寫</P>
          {GeneratedAddress}
          <Button
            block
            onClick={buttonOnClick}
            size="sm"
            style={{ marginTop: 10 }}
          >
            {buttonText}
          </Button>
        </Container>
      </div>
    </ClientCard>
  );
}

function copyToClipboard() {
  textArea.select();
  document.execCommand("copy");
}

function InputField({ values, setValues }) {
  return (
    <>
      <FormControl
        placeholder={"代收店號"}
        onChange={(event) =>
          setValues({ ...values, shopNumber: event.target.value })
        }
        size="sm"
        style={{ border: 0 }}
      />
      <LineBreak />
      <FormControl
        placeholder={"你的手機號"}
        onChange={(event) =>
          setValues({ ...values, phoneNumber: event.target.value })
        }
        size="sm"
        style={{ border: 0 }}
      />
    </>
  );
}

function GeneratedAddressTextArea({ phoneNumber, shopNumber }) {
  return (
    <>
      <Form.Control
        as="textarea"
        ref={(textarea) => (textArea = textarea)}
        rows={3}
        style={{ fontSize: 12, resize: "none" }}
        value={`收件人: ${shopNumber}@${phoneNumber}\n手机号码: 15363530392\n广东省珠海市香洲区九洲大道中2123号`}
      />
      <Button block onClick={copyToClipboard} size="sm" variant="link">
        複制
      </Button>
    </>
  );
}

const styles = {
  addressContainer: {
    borderRadius: 8,
    boxShadow: styleSchema.shadowLight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
  },
};
