import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import LoginView from "./login.view";
import { SMS_NUMBER_PASSWORD_LOGIN } from "online-shopping-cargo-parent/dist/service";
import { FORGOT_PASSWORD, LANDING_PAGE, REGISTER } from "../../routes";
import { withRouter } from "react-router-dom";

class Login extends ClientApplicationComponent {
  render() {
    return (
      <LoginView
        onCloseModal={this.onCloseModal}
        onClickForgotPassword={this.onClickForgotPassword}
        onClickLogin={this.onClickLogin}
        onClickRegister={this.onClickRegister}
        {...this.state}
      />
    );
  }

  onClickForgotPassword = () => {
    this.goTo(FORGOT_PASSWORD);
  };

  onClickLogin = (credential) => {
    this.serviceExecutor
      .execute(SMS_NUMBER_PASSWORD_LOGIN(credential))
      .then((response) => this.goTo(LANDING_PAGE));
  };

  onClickRegister = () => {
    this.goTo(REGISTER);
  };
}

export default withRouter(Login);
