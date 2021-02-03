import React from "react";
import ApplicationModal from "online-shopping-cargo-parent/dist/applicationModal";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import View from "online-shopping-cargo-parent/dist/view";

export default function ConfirmModal(props) {
  return (
    <ApplicationModal hideDefaultCloseSection {...props}>
      <ButtonSection {...props} />
    </ApplicationModal>
  );
}

function ButtonSection(props) {
  return (
    <View style={{ justifyContent: "space-around" }}>
      <CancelButton {...props} />
      <ConfirmButton {...props} />
    </View>
  );
}

function CancelButton({ onClose }) {
  return <ApplicationTextButton onClick={onClose}>取消</ApplicationTextButton>;
}

function ConfirmButton({ onClickConfirm, onClose }) {
  return (
    <ApplicationButton
      onClick={() => {
        onClickConfirm();
        onClose();
      }}
    >
      確定
    </ApplicationButton>
  );
}
