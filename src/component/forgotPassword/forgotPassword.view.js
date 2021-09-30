import React from "react";

import SmsRequestView, { Container } from "../smsRequest/smsRequest.view";

export default class ForgotPasswordView extends SmsRequestView {
  render() {
    return (
      <this.Wrapper>
        <Container
          submitLabel="重置密碼"
          style={{ padding: 30 }}
          {...this.props}
        />
      </this.Wrapper>
    );
  }
}
