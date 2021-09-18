import React from "react";
import SmsRequestView, { Container } from "../smsRequest/smsRequest.view";

export default class RegisterView extends SmsRequestView {
  render() {
    return (
      <this.Wrapper>
        <h3>澳提註冊</h3>
        <Container submitLabel="註冊" style={{ padding: 30 }} {...this.props} />
      </this.Wrapper>
    );
  }
}
