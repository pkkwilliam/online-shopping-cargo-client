import React from "react";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import BackgroundCard from "../common/backgroundCard";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import ApplicationConfirmModal from "online-shopping-cargo-parent/dist/applicationConfirmModal";
import ApplicationPhoneNumberTextField from "online-shopping-cargo-parent/dist/applicationPhoneNumberTextField";
import ApplicationColumnTextField from "online-shopping-cargo-parent/dist/applicationColumnTextField";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";

export const CONTACT_NAME = "CONTACT_NAME";
export const PHONE_NUMBER = "PHONE_NUMBER";
export const STREET = "STREET";
export const UNIT = "UNIT";

export default class EditAddressView extends ApplicationComponentView {
  render() {
    const {
      address,
      confirmModal,
      isEdit,
      onChangeValue,
      onClickConfirmDelete,
      onClickDelete,
      onClickSubmit,
      onCloseConfirmModal,
    } = this.props;
    const { contactName, street, unit } = address;
    return (
      <this.Wrapper>
        <ApplicationConfirmModal
          onClose={onCloseConfirmModal}
          onClickConfirm={onClickConfirmDelete}
          {...confirmModal}
        />
        <BackgroundCard
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form style={{ width: "100%" }} noValidate>
            <ApplicationColumnTextField
              label="收件人"
              onChange={(event) =>
                onChangeValue(CONTACT_NAME, event.target.value)
              }
              placeHolder={"請輸入收件人名字"}
              value={contactName}
            />
            <LineBreak />
            <Form.Group as={Row} style={{}}>
              <Form.Label column sm="2">
                電話
              </Form.Label>
              <Col sm="10">
                <ApplicationPhoneNumberTextField {...this.props} />
              </Col>
            </Form.Group>
            <LineBreak />
            <ApplicationColumnTextField
              label="街道"
              onChange={(event) => onChangeValue(STREET, event.target.value)}
              placeHolder={"請輸入街道"}
              value={street}
            />
            <LineBreak />
            <ApplicationColumnTextField
              label="詳細"
              onChange={(event) => onChangeValue(UNIT, event.target.value)}
              placeHolder={"請輸入大廈名，樓層及單位"}
              value={unit}
            />
            <LineBreak />
          </Form>
          <View style={{ flexDirection: "column" }}>
            <ApplicationButton block onClick={onClickSubmit}>
              {isEdit ? "修改地址" : "新建地址"}
            </ApplicationButton>
            <DeleteButton isEdit={isEdit} onClickDelete={onClickDelete} />
          </View>
        </BackgroundCard>
      </this.Wrapper>
    );
  }
}

function DeleteButton({ isEdit, onClickDelete }) {
  if (!isEdit) {
    return <></>;
  }
  return (
    <ApplicationTextButton
      onClick={onClickDelete}
      style={{ fontSize: 13, marginTop: 8 }}
      type="danger"
    >
      删除地址
    </ApplicationTextButton>
  );
}
