import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import ChangePasswordView, {
  ORIGINAL_PASSWORD_FIELD,
  NEW_PASSWORD_FIELD,
  NEW_PASSWORD_FIELD_2,
} from "./changePassword.view";
import {
  CHANGE_PASSWORD,
  REGISTER_USER_FOR_MISSING_PASSWORD,
} from "online-shopping-cargo-parent/dist/service";
import { withRouter } from "react-router-dom";

class ChangePassword extends UserProfileComponent {
  state = {
    newPassword: "",
    newPassword2: "",
    oldPassword: "",
  };

  render() {
    return (
      <ChangePasswordView
        onChangeTextField={this.onChangeTextField}
        onClickSetPassword={this.onClickSetPassword}
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

  onClickSetPassword = () => {
    const { newPassword, newPassword2, oldPassword } = this.state;
    this.validateRequest(newPassword, newPassword2, oldPassword);
    if (this.appState.user.userProfile.register) {
      this.changePassword(newPassword, oldPassword);
    } else {
      this.setupPassword(newPassword);
    }
  };

  changePassword(newPassword, password) {
    this.serviceExecutor
      .execute(CHANGE_PASSWORD({ newPassword, password }))
      .then(() => this.onSuccess());
  }

  setupPassword(newPassword) {
    this.serviceExecutor
      .execute(REGISTER_USER_FOR_MISSING_PASSWORD({ newPassword }))
      .then(() => this.onSuccess());
  }

  onSuccess() {
    this.showModal("密碼設置成功", "設置成功");
    this.setState({
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    });
    this.appState.user.setUserDirty(true);
  }

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

export default withRouter(ChangePassword);
