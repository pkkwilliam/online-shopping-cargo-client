import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import Form from "react-bootstrap/esm/Form";
import ApplicationTextField from "online-shopping-cargo-parent/dist/applicationTextField";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import { UsernameSection } from "../userProfile/userProfile.view";

export const ORIGINAL_PASSWORD_FIELD = "ORIGINAL_PASSWORD_FIELD";
export const NEW_PASSWORD_FIELD = "NEW_PASSWORD_FIELD";
export const NEW_PASSWORD_FIELD_2 = "NEW_PASSWORD_FIELD_2";

export default class ChangePasswordView extends ApplicationComponentView {
  render() {
    const {
      newPassword,
      newPassword2,
      onChangeTextField,
      onClickSetPassword,
      oldPassword,
      userProfile,
    } = this.props;
    const { changePasswordComponent, textField } = styles;
    return (
      <this.Wrapper>
        <UsernameSection {...userProfile} />
        <OldPasswordTextField
          register={userProfile.register}
          onChangeTextField={onChangeTextField}
          value={oldPassword}
        />
        <ApplicationTextField
          onChange={(event) =>
            onChangeTextField(NEW_PASSWORD_FIELD, event.target.value)
          }
          placeHolder="新密碼(至少6位)"
          type="password"
          value={newPassword}
          style={{ ...changePasswordComponent, ...textField }}
        />
        <ApplicationTextField
          onChange={(event) =>
            onChangeTextField(NEW_PASSWORD_FIELD_2, event.target.value)
          }
          placeHolder="請再次輸入新密碼"
          type="password"
          value={newPassword2}
          style={{ ...changePasswordComponent, ...textField }}
        />
        <ApplicationButton
          block
          onClick={onClickSetPassword}
          style={changePasswordComponent}
        >
          設置密碼
        </ApplicationButton>
      </this.Wrapper>
    );
  }
}

function OldPasswordTextField({ onChangeTextField, register, value }) {
  return register ? (
    <ApplicationTextField
      onChange={(event) =>
        onChangeTextField(ORIGINAL_PASSWORD_FIELD, event.target.value)
      }
      placeHolder="舊密碼"
      type="password"
      value={value}
      style={{ ...styles.changePasswordComponent, ...styles.textField }}
    />
  ) : null;
}

const styles = {
  changePasswordComponent: {
    borderRadius: 10,
    marginTop: 10,
  },
  textField: {
    width: "100%",
  },
};
