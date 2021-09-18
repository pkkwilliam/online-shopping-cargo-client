import {
  FORGOT_PASSWORD_REQUEST_VERIFICATION,
  FORGOT_PASSWORD_VERIFY,
} from "online-shopping-cargo-parent/dist/service";
import React from "react";
import SmsRequest from "../smsRequest/smsRequest";
import { withRouter } from "react-router-dom";
import { LANDING_PAGE } from "../../routes";
import ForgotPasswordView from "./forgotPassword.view";

class ForgotPassword extends SmsRequest {
  render() {
    return (
      <ForgotPasswordView
        onCloseModal={this.onCloseError}
        onClickRequestVerification={this.onClickRequestVerification}
        onClickSubmit={this.onClickSubmit}
        {...this.state}
      />
    );
  }

  onRequestVerification(credential) {
    return this.serviceExecutor.execute(
      FORGOT_PASSWORD_REQUEST_VERIFICATION(credential)
    );
  }

  onSubmit(credential) {
    this.serviceExecutor
      .execute(FORGOT_PASSWORD_VERIFY(credential))
      .then(() => this.goToReplace(LANDING_PAGE));
  }
}

export default withRouter(ForgotPassword);
