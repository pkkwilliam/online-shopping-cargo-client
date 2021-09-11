import React from "react";
import SmsRequestView from "./smsRequest.view";
import ClientApplicationComponent from "../clientApplicationComponent";

export default class SmsRequest extends ClientApplicationComponent {
  state = {
    ...this.state,
    countdown: 0,
  };

  render() {
    const { submitLabel } = this.props;
    return (
      <SmsRequestView
        onCloseModal={this.onCloseError}
        onClickRequestVerification={this.onClickRequestVerification}
        onClickSubmit={this.onClickSubmit}
        submitLabel={submitLabel}
        {...this.state}
      />
    );
  }

  onClickRequestVerification = (credential) => {
    this.onRequestVerification(credential).then(() => {
      this.setState({
        countdown: 120,
      });
      const countdownInterval = setInterval(() => {
        this.setState((state) => ({ countdown: this.state.countdown - 1 }));
      }, 1000);
    });
  };

  onClickSubmit = (credential) => {
    const { confirmPassword, password } = credential;
    if (confirmPassword !== password) {
      this.setModal({ body: "密碼不一致", header: "出錯", show: true });
      return;
    }
    this.onSubmit(credential);
  };

  onRequestVerification(credential) {
    console.log("need override");
  }

  onSubmit(credential) {
    console.log("need override");
  }
}
