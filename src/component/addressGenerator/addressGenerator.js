import React, { useState } from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ClientCard from "../common/clientCard";
import FormControl from "react-bootstrap/esm/FormControl";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";

const INITIAL_STATE = {
  phoneNumber: "",
  shopNumber: "",
  show: false,
};

export default function AddressGenerator(props) {
  const [values, setValues] = useState(INITIAL_STATE);

  const GeneratedAddress = values.show ? (
    <Address {...values} />
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

function Address({ phoneNumber, shopNumber }) {
  return (
    <div style={{ marginTop: 5 }}>
      <p style={{ margin: 0 }}>請複製後打開淘寶並添加收貨地址</p>
      <div style={styles.addressContainer}>
        <P>{`收件人: ${shopNumber}@${phoneNumber}`}</P>
        <P>手机号码: 15363530392</P>
        <P>广东省珠海市香洲区九洲大道中2123号</P>
      </div>
    </div>
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
