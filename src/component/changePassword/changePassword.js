import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import ChangePasswordView, {
  ORIGINAL_PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
  NEW_PASSWORD_FIELD_2,
} from "./changePassword.view";
import { CHANGE_PASSWORD } from "online-shopping-cargo-parent/dist/service";

export default class ChangePassword extends UserProfileComponent {
  state = {
    newPassword: "",
    newPassword2: "",
    oldPassword: "",
  };

  render() {
    return (
      <ChangePasswordView
        onChangeTextField={this.onChangeTextField}
        onClickChangePassword={this.onClickChangePassword}
        onCloseModal={this.onCloseError}
        userProfile={this.appState.user.userProfile}
        {...this.state}
      />
    );
  }

  onChangeTextField = (type, value) => {
    let { newPassword, newPassword2, oldPassword } = this.state;
    switch (type) {
      case NEW_PASSWORD_FIELD:
        newPassword = value;
        break;
      case NEW_PASSWORD_FIELD_2:
        newPassword2 = value;
        break;
      case ORIGINAL_PASSWORD_FIELD:
        oldPassword = value;
        break;
    }
    this.setState({
      oldPassword,
      newPassword,
      newPassword2,
    });
  };

  onClickChangePassword = () => {
    const { newPassword, newPassword2, oldPassword } = this.state;
    this.validateRequest(newPassword, newPassword2, oldPassword);
    this.serviceExecutor
      .execute(CHANGE_PASSWORD({ newPassword, password: oldPassword }))
      .then(() => this.showModal("新密碼更改成功", "更改成功"));
  };

  showModal(body, header) {
    this.setState({
      modal: {
        body,
        header,
        show: true,
      },
    });
  }

  validateRequest(newPassword, newPassword2, oldPassword) {
    if (newPassword.length < 6) {
      this.showModal("新密碼長度不足", "密碼不符合要求");
      throw "new password length not satisfy";
    } else if (newPassword !== newPassword2) {
      this.showModal("新密碼與再次輸入的新密碼不相符", "密碼不符合要求");
      throw "new password not match";
    }
  }
}
