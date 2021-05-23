import React from "react";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import BackgroundCard from "../common/backgroundCard";
import View from "online-shopping-cargo-parent/dist/view";

export default function EditAddressView(props) {
  const { isEdit } = props;
  return (
    <BackgroundCard
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Form style={{ width: "100%" }}>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            收件人
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="請輸入收件人名字" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            電話
          </Form.Label>
          <Col sm="10">
            <Form.Control type="number" placeholder="請輸入收件人電話" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            街道
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="請輸入街道" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            詳細
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="請輸入大廈名，樓層及單位" />
          </Col>
        </Form.Group>
      </Form>
      <ApplicationButton block>
        {isEdit ? "修改地址" : "新建地址"}
      </ApplicationButton>
    </BackgroundCard>
  );
}
