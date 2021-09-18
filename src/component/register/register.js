import React from "react";
import RegisterView from "./register.view";
import SmsRequest from "../smsRequest/smsRequest";
import {
  REQUEST_VERIFICATION,
  VERIFY,
} from "online-shopping-cargo-parent/dist/service";
import { withRouter } from "react-router-dom";
import { LANDING_PAGE } from "../../routes";

class Register extends SmsRequest {
  render() {
    return (
      <RegisterView
        onCloseModal={this.onCloseError}
        onClickRequestVerification={this.onClickRequestVerification}
        onClickSubmit={this.onClickSubmit}
        {...this.state}
      />
    );
  }

  onRequestVerification(credential) {
    return this.serviceExecutor.execute(REQUEST_VERIFICATION(credential));
  }

  onSubmit(credential) {
    return this.serviceExecutor
      .execute(VERIFY(credential))
      .then(() => this.goToReplace(LANDING_PAGE));
  }
}

export default withRouter(Register);
