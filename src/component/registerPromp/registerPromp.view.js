import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";

const ApplicationModal = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/applicationModal")
);

export default class RegisterPrompView extends ApplicationComponentView {
  render() {
    const { onCloseModal, showPromp } = this.props;
    return (
      <ApplicationModal
        body="系統發現你未為你的賬號添加密碼，即將跳轉到用戶信息頁面添加密碼。"
        closeButtonText="跳轉"
        header="添加密碼"
        onClose={onCloseModal}
        show={showPromp}
      />
    );
  }
}
